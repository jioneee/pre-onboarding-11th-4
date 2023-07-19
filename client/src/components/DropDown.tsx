import styled from 'styled-components';
import { SickData } from './SearchBar';

interface DropsDownProps {
  sickData: SickData[];
  search: string;
}

export function DropDown({ sickData, search }: DropsDownProps) {
  const filteredData = sickData.filter((item) =>
    item.sickNm.toLowerCase().startsWith(search.toLowerCase())
  );
  return (
    <>
      <Container>
        {search.length === 0 ? (
          <div>검색어 없음</div>
        ) : (
          <div>
            {filteredData.map((item) => (
              <div key={item.sickCd}>{item.sickNm}</div>
            ))}
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
`;
