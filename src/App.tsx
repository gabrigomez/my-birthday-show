import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { BirthdayFestival } from './components/BirthdayFestival';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/birthday-festival' element={<BirthdayFestival />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
