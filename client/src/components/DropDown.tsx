import styled from 'styled-components';
import { useState } from 'react';
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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const filteredData = sickData.filter((item) =>
    item.sickNm.toLowerCase().startsWith(search.toLowerCase())
  );
  const handleRecentSearch = (recentSearch: string) => {
    setSearch(recentSearch);
    console.log('recent', recentSearch);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredData.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        setFocusedIndex((prevIndex) =>
          prevIndex === null || prevIndex === filteredData.length - 1
            ? 0
            : prevIndex + 1
        );
        break;
      case 'ArrowUp':
        setFocusedIndex((prevIndex) =>
          prevIndex === null || prevIndex === 0
            ? filteredData.length - 1
            : prevIndex - 1
        );
        break;
      case 'Enter':
        if (
          focusedIndex !== null &&
          focusedIndex >= 0 &&
          focusedIndex < filteredData.length
        ) {
          setSearch(filteredData[focusedIndex].sickNm);
          setFocusedIndex(null);
        }
        break;
      default:
        break;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
    }
  };
  const recentSearches = localStorage.getItem('recentSearches');
  const parsedRecentSearches = recentSearches ? JSON.parse(recentSearches) : [];

  return (
    <>
      <Container>
        {firstTimeSearch && search.length === 0 ? (
          <>
            <TextTitle>검색어 없음</TextTitle>
          </>
        ) : (
          <div>
            <Input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <RecentSearchContainer>
              <TextTitle>최근검색어</TextTitle>

              {parsedRecentSearches.map((recent: string, index: number) => (
                <div
                  key={recent}
                  onClick={() => handleRecentSearch(recent)}
                  style={{
                    background:
                      index === focusedIndex ? '#e1e1e1' : 'transparent'
                  }}
                >
                  {recent}
                </div>
              ))}
            </RecentSearchContainer>
            {search.length !== 0 ? (
              <FilteredContainer>
                <TextTitle>추천 검색어</TextTitle>
                {filteredData.map((item, index: number) => (
                  <div
                    key={item.sickCd}
                    style={{
                      background:
                        index === focusedIndex ? '#e1e1e1' : 'transparent'
                    }}
                  >
                    {item.sickNm}
                  </div>
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
  border-color: #ffffff;
  background-color: #ffffff;
  border-radius: 20px;
  width: 490px;
  min-height: 200px;
  margin: 5px auto;
  padding: 10px;
  text-align: left;
  font-size: medium;
  font-weight: lighter;
`;
const Input = styled.input`
  border: none;
  padding: 10px auto;
  pointer-events: none;
`;
const FilteredContainer = styled.div`
  margin: 10px auto;
`;
const RecentSearchContainer = styled.div`
  margin: 20px auto;
`;

const TextTitle = styled.div`
  font-weight: bold;
  font-size: large;
  text-align: left;
`;
