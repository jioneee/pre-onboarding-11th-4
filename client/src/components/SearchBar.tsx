import { useEffect, useState } from 'react';
import { getSick } from '../api/sickApi';
import { DropDown } from './DropDown';

export interface SickData {
  sickCd: string;
  sickNm: string;
}

export default function SearchBar() {
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
    console.log('토글');
  };

  return (
    <>
      검색창
      <input
        type='text'
        value={search}
        onChange={onSearchHandler}
        onClick={onClickToggle}
        placeholder='질환명을 입력해주세요'
      />
      <button type='submit'>검색</button>
      {!searchToggle && <DropDown sickData={sickData} search={search} />}
      {sickData.length > 0 && (
        <div>
          <p>Sick Code: {sickData[0].sickCd}</p>
          <p>Sick Name: {sickData[0].sickNm}</p>
        </div>
      )}
    </>
  );
}
