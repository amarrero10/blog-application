import { Route, Switch } from "react-router-dom";
import Blogs from "./Components/Blogs/Blogs";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Blogs />
        </Route>
      </Switch>
    </>
  );
}

export default App;
