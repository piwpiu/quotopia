import './App.css';
import RandomQuote from './Components/RandomQuote/RandomQuote';

function App() {
  return (
    <div>
      <RandomQuote/>
      <p className='copyright'>
        &copy; 2024, <a href='https://github.com/piwpiu' className='name'>Muhamad Rafi Ramdhani</a>. All rights reserved.
      </p>
    </div>
  );
}

export default App;
