import React, { FC } from "react";
import "./App.scss";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: FC = () => {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/overview" component={Overview} exact></Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
