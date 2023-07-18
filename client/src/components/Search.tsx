import { useEffect, useState } from 'react';
import axios from 'axios';

interface SickData {
  sickCd: string;
  sickNm: string;
}

export default function Search() {
  const [search, setSearch] = useState('');
  const [sickData, setSickData] = useState<SickData | null>(null);
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const getData = async (): Promise<void> => {
    try {
      const res = axios.get('http://localhost:4000/sick');

      setSickData((await res).data);
    } catch (error) {
      console.log('error', error);

      throw error;
    }
  };

  useEffect(() => {
    setSickData;
  }, [getData]);
  return (
    <>
      검색창
      <input type='text' value={search} onChange={onSearchHandler} />
      <button onClick={getData}>검색</button>
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
