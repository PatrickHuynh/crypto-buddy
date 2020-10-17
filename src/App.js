import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./containers/Home";
import TradingView from "./containers/TradingView";

function App() {
    return (
        <div className="App bg-dark text-white">
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/tradingview" component={TradingView} />
            </Switch>
        </div>
    );
}

export default App;
