import React, { useContext } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';
import axios from './axios-order';
import Layout from './components/Layout/Layout';
import AdminPanel from './../src/containers/AdminPanel/AdminPanel';
import Auth from './components/Auth/Auth';
import { AuthContext } from './components/context/Auth-Context';


const App = () => {
  axios.interceptors.request.use(req => {
    const token = sessionStorage.getItem('access__token');    
    if(!token) {return req;}  
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
  const authContext = useContext(AuthContext); 
  const token = sessionStorage.getItem('access__token');   
  let authAdmin = <Auth/> ;
  if (authContext.isAuth || token) authAdmin = <AdminPanel/>;
 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route  path="/operator" >
            {authAdmin}
          </Route>
          <Route path="/" component={Layout}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;