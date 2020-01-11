import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./modules/configureStore";
import Home from "./components/Home/Home";
import './App.css';

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
          </BrowserRouter>
        </div>
      </Provider>
  );
}

export default App;
