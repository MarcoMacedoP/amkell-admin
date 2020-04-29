import * as React from "react";
import { Layout } from "./components/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Solutions } from "./pages/Solutions";
import { Solution } from "./pages/Solution";
import { Materials } from "./pages/Materials";
import { AddMaterial } from "./pages/AddMaterial";
import { Material } from "./pages/Material";
import { Projects } from "./pages/Projects";
import { AddProject } from "./pages/AddProject";
import { Project } from "./pages/Project";
import { About } from "./pages/About";
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
          <Route exact path="/materiales/:slug">
            <Material />
          </Route>
          <Route exact path="/proyectos">
            <Projects />
          </Route>
          <Route exact path="/proyectos/agregar">
            <AddProject />
          </Route>
          <Route exact path="/proyectos/:slug">
            <Project />
          </Route>
          <Route exact path="/nosotros">
            <About />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

const IndexPage = () => (
  <div className=" items-center justify-center">Hello there</div>
);
