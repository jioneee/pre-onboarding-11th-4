import { useState } from 'react';
import { getSick } from '../api/sickApi';

interface SickData {
  sickCd: string;
  sickNm: string;
}

export default function Search() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<SickData | null>(null);
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const getData = async (): Promise<void> => {
    try {
      const response = await getSick();
      console.log(response);
      setData(response);
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };
  return (
    <>
      검색창
      <input type='text' value={search} onChange={onSearchHandler} />
      <button onClick={getData}>검색</button>
      {data && <div></div>}
    </>
  );
}
