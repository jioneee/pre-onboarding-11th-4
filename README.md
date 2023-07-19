### pre-onboarding-11th-4
이지원

### 구현 목표
- 한국임상정보 사이트 검색영역 클론
- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
    - 검색어가 없을 시 “검색어 없음” 표출

→DropDown.tsx : 최근 검색한 내용이 없을 경우 검색어 없음 나타나게 함

```tsx
<Container>
        {firstTimeSearch ? (
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
              <TextTitle>최근 검색어</TextTitle>

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
```

- API 호출별로 로컬 캐싱 구현
    - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
    - 캐싱을 어떻게 기술했는지 / expire time을 구현
    
    → SearchBar.tsx : localstorage에 저장하여 최근 검색으로 나타나도록 함
    

```tsx
export async function getSick() {
  const cachedData = localStorage.getItem('sickData');
  if (cachedData) {
    const { data, expireTime } = JSON.parse(cachedData);
    if (expireTime > Date.now()) {
      return data;
    }
  }
  try {
    const response = await axios.get('http://localhost:4000/sick');

    const expireTime = Date.now() + 3600000;
    localStorage.setItem(
      'sickData',
      JSON.stringify({ data: response.data, expireTime })
    );
    console.info('calling api');
    return response.data;
  } catch (error) {
    console.log('error', error);

    throw error;
  }
```

- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

→SearchBar.tsx : debounce delay를 500ms 만큼 걸어서 API 호출 제한 

```tsx
useEffect(() => {
    const timer = 500;
    let debounceTimer: NodeJS.Timeout | null = null;
    const getData = async () => {
      try {
        const response = await getSick();
        setSickData(response);
      } catch (error) {
        console.log('error', error);
        throw error;
      }
    };
    if (search && !firstTimeSearch) {
      if (debounceTimer) {
        clearTimeout(timer);
      }
      debounceTimer = setTimeout(getData, timer);
    } else {
      setSickData([]);
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [search, firstTimeSearch]);
```

- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

→sickApi.tsx

```tsx

try {
    const response = await axios.get('http://localhost:4000/sick');

    const expireTime = Date.now() + 3600000;
    localStorage.setItem(
      'sickData',
      JSON.stringify({ data: response.data, expireTime })
    );
    console.info('calling api');
    return response.data;
```

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

→DropDown.tsx

```tsx
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
```


### 파일구조

```
📦src
┣ 📂api
┃ ┗ 📜sickApi.tsx
┣ 📂components
┃ ┣ 📜DropDown.tsx
┃ ┗ 📜SearchBar.tsx
┣ 📂page
┃ ┣ 📜Main.tsx
┃ ┗ 📜Searched.tsx
┣ 📜App.tsx
┣ 📜index.css
┗ 📜index.tsx
```

### 기술스택

- 언어 : TypeScript
- 스타일 관련 라이브러리 : styled-components
- HTTP Client : axios
- 라우팅 라이브러리 : react-router-dom
