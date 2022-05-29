import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './Components/headers/Header';
import MainPages from './Components/mainpages/PageRoutes';
import Footer from './Components/footer/Footer'
import './App.css'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;