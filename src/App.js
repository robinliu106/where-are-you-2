import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
import GamePage from "./components/GamePage";

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/" component={GamePage} exact />
            </Switch>
        </div>
    );
};

export default App;
// <Route path="/" component={LandingPage} exact />
