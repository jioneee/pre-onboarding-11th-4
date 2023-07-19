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
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
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
  const onKeyUp = (event: any) => {
    if (event.keyCode === 13) {
      navigate('/search');
    }
  };
  const onClickSearch = () => {
    if (search.length !== 0) {
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
        <DropDown sickData={sickData} search={search} setSearch={setSearch} />
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
