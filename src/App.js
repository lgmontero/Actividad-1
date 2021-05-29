import React from 'react';
import { Form } from './components/Form'
import { Company } from './views/Company';
import { City } from './views/City';
import { Country } from './views/Country';
import { Job } from './views/Job';
import { image } from './utils/image';
import { BrowserRouter as Router, Switch, Route, Link, } from "react-router-dom";
/* eslint-disable */
function App() {
  return (
    <Router>



      <div  >
        <div className=" grad ">

          <div id="co0">

            <Link to="/" className="link" ><li id="lis6"> <a id="lis6" > Home</a ></li></Link>
            <Link to="/Job" className="link" ><li id="lis0"> <a > Empleos</a ></li> </Link>
            <Link to="/Company" className="link" ><li id="lis1">   <a> Compañias</a ></li></Link>
            <Link to="/City" className="link" ><li id="lis2">   <a> Ciudad</a ></li></Link>
            <Link to="/Country" className="link" ><li id="lis3">   <a> Pais</a ></li></Link>
          </div>



        </div>
        <Switch>
          <Route path="/" exact>
            <div className="conteiner-home">
              <img src={image.img1} />
              <div className="page">
              <Form />
              </div>
            </div>
          </Route>
          <Route path="/Job" exact>
          <div className="conteiner-jobs">
              <img src={image.img2} />
              <div className="pagejobs">
            <Job />
            </div>
            </div>
          </Route>
          <Route path="/Company">
          <div className="conteiner-jobs">
              <img src={image.img2} />
              <div className="pagejobs">
            <Company />
            </div>
            </div>
          </Route>
          <Route path="/City" exact>
          <div className="conteiner-jobs">
              <img src={image.img2} />
              <div className="pagejobs">
            <City />
            </div>
            </div>
          </Route>
          <Route path="/Country">
          <div className="conteiner-jobs">
              <img src={image.img2} />
              <div className="pagejobs">
            <Country />
            </div>
            </div>
          </Route>
        </Switch>
        <hr />
      </div>
    </Router>
  );
}
export default App;