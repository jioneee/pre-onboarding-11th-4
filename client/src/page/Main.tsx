import styled from 'styled-components';

import SearchBar from '../components/SearchBar';
export default function Main() {
  return (
    <MainContainer>
      <SearchBar />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 50px auto;
  padding: 10px;
  align-items: center;
  text-align: center;
  font-size: 2.125rem;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
`;
