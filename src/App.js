import React from 'react';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Link, NavLink, Route, Routes } from 'react-router-dom';
import './css/global.scss';
import routes from './routes';
import Layout from './components/Layout';
import NewsContextProvider from './context/NewsContext';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
