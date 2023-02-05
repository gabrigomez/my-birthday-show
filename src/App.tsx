import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { BirthdayShow } from './components/BirthdayShow';
import { Terms } from './components/Terms';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/birthday-show' element={<BirthdayShow />} />
          <Route path='/privacy' element={<Terms />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
