import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { BirthdayShow } from './components/BirthdayShow';
import { Privacy } from './components/Privacy';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/birthday-show' element={<BirthdayShow />} />
          <Route path='/privacy' element={<Privacy />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
