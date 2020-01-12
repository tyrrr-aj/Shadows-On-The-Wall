import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./modules/configureStore";
import Home from "./components/Home/Home";
import "./App.css";
import AddProblem from "./components/AddProblem/AddProblem";
import AddInitiative from "./components/AddInitiative/AddInitiative";
import EditProblem from "./components/EditProblem/EditProblem";
import ProblemPage from "./components/ProblemPage/ProblemPage";
import ProblemGraph from "./components/ProblemGraph/ProblemGraph";
import InitiativeGraph from "./components/InitiativeGraph/InitiativeGraph";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/problem/new" component={AddProblem} />
            <Route path="/problem/:id" component={ProblemPage} />
            <Route path="/problem/:id/graph" component={ProblemGraph} />
            <Route path="/initiative/new" component={AddInitiative} />
            <Route path="/initiative/:id/graph" component={InitiativeGraph} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
