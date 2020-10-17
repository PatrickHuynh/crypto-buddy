import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./containers/Home";
import TradeView from "./containers/TradeView";

function App() {
    return (
        <div className="App bg-dark">
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/tradeview" component={TradeView} />
            </Switch>
        </div>
    );
}

export default App;
