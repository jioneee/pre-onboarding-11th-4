import { useEffect, useState } from 'react';
// import axios from 'axios';
import { getSick } from '../api/sickApi';

interface SickData {
  sickCd: string;
  sickNm: string;
}

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [sickData, setSickData] = useState<SickData | null>(null);
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

  return (
    <>
      검색창
      <input
        type='text'
        value={search}
        onChange={onSearchHandler}
        placeholder='질환명을 입력해주세요'
      />
      <button type='submit'>검색</button>
      {sickData && (
        <div>
          <h2>Sick Data:</h2>
          <p>Sick Code: {sickData.sickCd}</p>
          <p>Sick Name: {sickData.sickNm}</p>
        </div>
      )}
    </>
  );
}
