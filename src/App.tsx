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
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { OnlyNotAuthRoute } from "./components/OnlyNotAuthRoute";
type AppProps = {};

export const App: React.FC<AppProps> = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <OnlyNotAuthRoute exact path="/">
            <Login />
          </OnlyNotAuthRoute>
          <PrivateRoute exact path="/soluciones">
            <Solutions />
          </PrivateRoute>
          <PrivateRoute exact path="/soluciones/:slug">
            <Solution />
          </PrivateRoute>
          <PrivateRoute exact path="/materiales">
            <Materials />
          </PrivateRoute>
          <PrivateRoute exact path="/materiales/agregar">
            <AddMaterial />
          </PrivateRoute>
          <PrivateRoute exact path="/materiales/:slug">
            <Material />
          </PrivateRoute>
          <PrivateRoute exact path="/proyectos">
            <Projects />
          </PrivateRoute>
          <PrivateRoute exact path="/proyectos/agregar">
            <AddProject />
          </PrivateRoute>
          <PrivateRoute exact path="/proyectos/:slug">
            <Project />
          </PrivateRoute>
          <PrivateRoute exact path="/nosotros">
            <About />
          </PrivateRoute>
        </Switch>
      </Layout>
    </Router>
  );
};

const IndexPage = () => (
  <div className=" items-center justify-center">Hello there</div>
);
