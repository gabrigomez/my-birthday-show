import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { BirthdayShow } from './components/BirthdayShow';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/birthday-show' element={<BirthdayShow />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
