import React from 'react';
import { Form } from './components/Form'
import { Company } from './views/Company';
import { City } from './views/City';
import { Country } from './views/Country';
import { Job } from './views/Job';
import { BrowserRouter as Router, Switch, Route, Link,  } from "react-router-dom";
/* eslint-disable */
function App() {
  return (
    <Router>
      <div  >
        <div className=" grad ">
          <div id="co0">
          
          <Link  to="/"           className="link" > <li id="lis6" > <a id="lis6" > Home</a ></li></Link>
          <Link  to="/Job"        className="link" > <li id="lis0" > <a > Empleos</a ></li> </Link>
          <Link  to="/Company"    className="link" ><li id="lis1">   <a> Compañias</a ></li></Link>
          <Link  to="/City"       className="link" ><li id="lis2">   <a> Ciudad</a ></li></Link>
          <Link  to="/Country"    className="link" ><li id="lis3">   <a> Pais</a ></li></Link>
          </div>
        </div>
            

        <Switch>
        <Route path="/" exact>
            <Form />
          </Route>
          <Route path="/Job" exact>
            <Job />
          </Route>
          <Route path="/Company">
            <Company />
          </Route>
          <Route path="/City" exact>
            <City />
          </Route>
          <Route path="/Country">
            <Country />
          </Route>
        </Switch>
        <hr />
      </div>
    </Router>
  );
}
export default App;