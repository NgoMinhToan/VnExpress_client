import React from 'react';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Link, NavLink, Route, Routes, BrowserRouter } from 'react-router-dom';
import './css/global.scss';
import routes from './routes';
import Layout from './components/Layout';
import NewsContextProvider from './context/NewsContext';

function App() {
  return (
    <BrowserRouter basename='/'>
      <div id="App">
       <NewsContextProvider>
            <Routes>
              <Route to='/' element={<Layout />} >
                <Route index element={<Homepage />} />
                {routes?.map((route, index) => (
                  <Route key={index} path={route.path} exact={route.exact} element={route.component}/>
                ))}

              </Route>
            </Routes>
       </NewsContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
