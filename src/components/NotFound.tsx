import * as React from "react";
import { Button } from "./Button";
import { useHistory } from "react-router-dom";

type NotFoundProps = {};

export const NotFound: React.FC<NotFoundProps> = ({}) => {
  const history = useHistory();
  const goHome = () => history.push("/");
  return (
    <div>
      <p className="text-xl text-red-700 mb-4">
        Ups, parece que este elemento no existe :(
      </p>
      <Button text="Regresar a inicio" onClick={goHome} />
    </div>
  );
};
