import {
  //React,
  FC
} from "react";
import "./App.scss";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import Mint from "./pages/Mint";
import Portfolio from "./pages/Portfolio";
import Stake from "./pages/Stake";
import Swap from "./pages/Swap";
//import Configurations from "./pages/Configurations";
import {
  //BrowserRouter as Router,
  HashRouter,
  Route,
  Switch
} from "react-router-dom";
//import IpfsRouter from "ipfs-react-router";

const App: FC = () => {
  return (
    <>
      <HashRouter>
        <Sidebar />
        <Switch>
          <Route path="/overview" component={Overview} exact></Route>
          <Route path="/Mint" component={Mint} exact></Route>
          <Route path="/" component={Portfolio} exact></Route>
          <Route path="/stake" component={Stake} exact></Route>
          <Route path="/swap" component={Swap} exact></Route>
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;
