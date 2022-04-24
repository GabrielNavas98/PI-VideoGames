import { Route, BrowserRouter, Switch } from 'react-router-dom';
import React from 'react';


// import { useDispatch } from "react-redux";
// import { useEffect } from 'react';
//import { getAllVideogames } from './redux/actions';

import './App.css';

import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Detail from './components/Detail/Detail';
import Create from './components/Create/Create';
// import VideogameCreate from './components/VideogameCreate/VideogameCreate'

function App() {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getAllVideogames())
  // }, [dispatch])
  
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/home/:id" component={Detail}/>
        <Route exact path="/videogame/" component={Create}/>
      </Switch>
      </div>    
    </BrowserRouter>
  );
}

export default App;
