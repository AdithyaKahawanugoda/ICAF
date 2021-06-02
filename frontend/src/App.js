import React from 'react'
import Header from './components/Header';
import { BrowserRouter as BRouter, Switch, Route } from "react-router-dom";

const App = () => {
    return (
        <BRouter>
        <Switch>
            <Route exact path="/home" component={Header} />
        </Switch>
        </BRouter>
        
        
    )
}

export default App
