import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { hasUser } from "../hooks/Firebase";

export function PrivateRoute({ children, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasUser() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
