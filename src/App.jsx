import { useState, useEffect  } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";

import Test1A from "./Component/Prueba1/Fisica1A";
import Test1B from "./Component/Prueba1/Fisica1B";
import Test2A from "./Component/Prueba1/Fisica2A";
import Test2B from "./Component/Prueba1/Fisica2B";
import Menu from "./Component/Prueba1/Menu";

function App() {

  
  return (
    <div className="container">
    <Router>
     <Switch>
        <Route exact path="/">
          <Menu />
        </Route>
        <Route exact path="/Fisica1A">
          <Test1A />
        </Route>
        <Route exact path="/Fisica1B">
          <Test1B />
        </Route>
        <Route exact path="/Fisica2A">
          <Test2A />
        </Route>
        <Route exact path="/Fisica2B">
          <Test2B />
        </Route>
     </Switch>
     </Router>
    </div>
  )
}

export default App
