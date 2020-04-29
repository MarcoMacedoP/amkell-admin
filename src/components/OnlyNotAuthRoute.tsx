import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { hasUser } from "../hooks/Firebase";

/**
 *
 * A route just for user with no auth.
 */
export function OnlyNotAuthRoute({ children, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasUser() ? (
          <Redirect
            to={{
              pathname: "/materiales",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}
