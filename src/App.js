
import './App.css';

import {
  // BrowserRouter, 
  Routes, 
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './Context/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState> {/* this is used when you used the context api in reat , write all the component inside the noteState */}
    <Navbar/>
    <Alert message="this is react app"/>
    <div className='container'>
      <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About/>}/>
      </Routes>
      </div>
      </NoteState>
    </>
  );
}

export default App;
