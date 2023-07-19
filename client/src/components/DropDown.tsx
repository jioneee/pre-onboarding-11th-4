import styled from 'styled-components';
// import { useState } from 'react';
import { SickData } from './SearchBar';

interface DropsDownProps {
  sickData: SickData[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  firstTimeSearch: boolean;
}

export function DropDown({
  sickData,
  search,
  setSearch,
  firstTimeSearch
}: DropsDownProps) {
  const filteredData = sickData.filter((item) =>
    item.sickNm.toLowerCase().startsWith(search.toLowerCase())
  );
  const handleRecentSearch = (recentSearch: string) => {
    setSearch(recentSearch);
    console.log('recent', recentSearch);
  };
  const recentSearches = localStorage.getItem('recentSearches');
  const parsedRecentSearches = recentSearches ? JSON.parse(recentSearches) : [];

  return (
    <>
      <Container>
        {firstTimeSearch && search.length === 0 ? (
          <>
            <div>검색어 없음</div>
          </>
        ) : (
          <div>
            <Input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <RecentSearchContainer>
              {parsedRecentSearches.map((recent: string) => (
                <div key={recent} onClick={() => handleRecentSearch(recent)}>
                  {recent}
                </div>
              ))}
            </RecentSearchContainer>
            {search.length !== 0 ? (
              <FilteredContainer>
                {filteredData.map((item) => (
                  <div key={item.sickCd}>{item.sickNm}</div>
                ))}
              </FilteredContainer>
            ) : null}
          </div>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  border: 1px solid;
  width: 250px;
  min-height: 200px;
`;
const Input = styled.input`
  border: none;
  padding: 10px auto;
  pointer-events: none;
`;
const FilteredContainer = styled.div`
  margin: 10px auto;
`;
const RecentSearchContainer = styled.div``;

{
  /* <Container>
{search.length === 0 ? (
  <>
    <div>검색어 없음</div>
    <RecentSearchContainer>
      {parsedRecentSearches.map((recent: string) => (
        <div key={recent} onClick={() => handleRecentSearch(recent)}>
          {recent}
        </div>
      ))}
    </RecentSearchContainer>
  </>
) : (
  <div>
    <Input
      type='text'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <FilteredContainer>
      {filteredData.map((item) => (
        <div key={item.sickCd}>{item.sickNm}</div>
      ))}
    </FilteredContainer>
  </div>
)}
</Container> */
}
