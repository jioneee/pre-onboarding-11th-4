import styled from 'styled-components';
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
            <TextTitle>검색어 없음</TextTitle>
          </>
        ) : (
          <div>
            <Input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <RecentSearchContainer>
              <TextTitle>최근검색어</TextTitle>

              {parsedRecentSearches.map((recent: string) => (
                <div key={recent} onClick={() => handleRecentSearch(recent)}>
                  {recent}
                </div>
              ))}
            </RecentSearchContainer>
            {search.length !== 0 ? (
              <FilteredContainer>
                <TextTitle>추천 검색어</TextTitle>
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
