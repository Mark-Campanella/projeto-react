import React from "react";
import { BrowserRouter as HashRouter, Route, Switch } from 'react-router-dom';


import Teste from '../pages/teste';
import Pagina2 from '../pages/pagina2';
import Categoria from '../pages/categoria';
import Fabricante from '../pages/fabricante';



const Routes = (props) => (
    <HashRouter>
        <Switch>
            <Route exact path="/teste" component={Teste}></Route>
            <Route exact path="/batatinha" component={Pagina2}></Route>
            <Route exact path="/categoria" component={Categoria}></Route>
            <Route exact path="/fabricante" component={Fabricante}></Route>

        </Switch>
    </HashRouter>
);

export default Routes;