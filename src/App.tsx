import * as React from "react";
import { Layout } from "./components/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Solutions } from "./pages/Solutions";
import { Solution } from "./pages/Solution";
import { Materials } from "./pages/Materials";
import { AddMaterial } from "./pages/AddMaterial";
type AppProps = {};

export const App: React.FC<AppProps> = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route exact path="/soluciones">
            <Solutions />
          </Route>
          <Route exact path="/soluciones/:slug">
            <Solution />
          </Route>
          <Route exact path="/materiales">
            <Materials />
          </Route>
          <Route exact path="/materiales/agregar">
            <AddMaterial />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

const IndexPage = () => (
  <div className=" items-center justify-center">Hello there</div>
);
