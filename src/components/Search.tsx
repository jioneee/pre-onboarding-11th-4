import { useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState('');
  const onSearchHandler = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <>
      검색창
      <input type='text' value={search} onChange={onSearchHandler} />
    </>
  );
}
