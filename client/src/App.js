import { Route, BrowserRouter, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
// import VideogameDetail from './components/VideogameDetail/VideogameDetail'
// import VideogameCreate from './components/VideogameCreate/VideogameCreate'
// import  NavBar  from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/home" component={Home}/>
      </Switch>
      </div>    
    </BrowserRouter>
  );
}

export default App;
