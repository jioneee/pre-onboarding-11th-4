import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getSick } from '../api/sickApi';
import { DropDown } from './DropDown';
import { useNavigate } from 'react-router-dom';

export interface SickData {
  sickCd: string;
  sickNm: string;
}

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sickData, setSickData] = useState<SickData[]>([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [firstTimeSearch, setFirstTimeSearch] = useState(true);
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    setFirstTimeSearch(false);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSick();
        console.log(response);
        setSickData(response);
      } catch (error) {
        console.log('error', error);
        throw error;
      }
    };
    getData();
  }, []);

  const onClickToggle = () => {
    setSearchToggle(!searchToggle);
  };
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      onClickSearch();
    }
  };
  const onClickSearch = () => {
    if (search.length !== 0) {
      const recentSearches = localStorage.getItem('recentSearches');
      const parsedRecentSearches = recentSearches
        ? JSON.parse(recentSearches)
        : [];
      const updatedRecentSearches = [...parsedRecentSearches, search];

      localStorage.setItem(
        'recentSearches',
        JSON.stringify(updatedRecentSearches)
      );

      setSearchToggle(true);
      navigate('/search');
    }
  };

  return (
    <SearchContainer>
      검색창
      <SearchBarContainer>
        <Input
          type='text'
          value={search}
          onChange={onSearchHandler}
          onClick={onClickToggle}
          onKeyUp={onKeyUp}
          placeholder='질환명을 입력해주세요'
        />
        <button type='submit' onClick={onClickSearch}>
          검색
        </button>
      </SearchBarContainer>
      {!searchToggle && (
        <DropDown
          sickData={sickData}
          search={search}
          setSearch={setSearch}
          firstTimeSearch={firstTimeSearch}
        />
      )}
      {sickData.length > 0 && (
        <div>
          <p>Sick Code: {sickData[0].sickCd}</p>
          <p>Sick Name: {sickData[0].sickNm}</p>
        </div>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;
const SearchBarContainer = styled.div`
  width: 300px;
`;

const Input = styled.input`
  width: 250px;
  align-items: center;
`;
