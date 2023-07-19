import Main from './page/Main';
import { Searched } from './page/Searched';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <header className='App-header'></header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/search' element={<Searched />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
