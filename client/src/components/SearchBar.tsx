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
      <H2>
        국내 모든 임상시험 검색하고
        <br></br>
        온라인으로 참여하기
      </H2>
      <SearchBarContainer>
        <Input
          type='text'
          value={search}
          onChange={onSearchHandler}
          onClick={onClickToggle}
          onKeyUp={onKeyUp}
          placeholder='질환명을 입력해주세요.'
        />
        <SearchButton type='submit' onClick={onClickSearch}>
          검색
        </SearchButton>
      </SearchBarContainer>
      {!searchToggle && (
        <DropDown
          sickData={sickData}
          search={search}
          setSearch={setSearch}
          firstTimeSearch={firstTimeSearch}
        />
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto;
`;
const H2 = styled.h2`
  font-size: 34px;
`;
const SearchBarContainer = styled.div`
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 42px;
  border-color: #ffffff;
  background-color: #ffffff;
  width: 490px;
  height: 72.9px;
  padding: 0px 0px 0px 0px;
`;

const Input = styled.input`
  width: 396.8px;
  height: 22.7px;
  outline: none;
  border: none;
  align-items: center;
  padding: 1px 25px 1px 2px;
  font-size: large;
  font-weight: 400;
  letter-spacing: -0.018em;
`;

const SearchButton = styled.button`
  height: 48px;
  width: 48px;
  color: #ffffff;
  font-weight: 700;
  background-color: #2b2bd7;
  border-radius: 100%;
  border: none;
  margin-right: 0%;
`;
