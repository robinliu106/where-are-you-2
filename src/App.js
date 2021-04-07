import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import GamePage from "./components/GamePage";
import HostGame from "./components/HostGame";

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/game" component={GamePage} />
                <Route path="/host" component={HostGame} />
            </Switch>
        </div>
    );
};

export default App;
