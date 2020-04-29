import * as React from "react";
import { Input } from "../components/Input";
import { useForm } from "../hooks/Forms";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { authUserWithEmailAndPassword, hasUser } from "../hooks/Firebase";
import { useHistory } from "react-router-dom";

type LoginProps = {};

export const Login: React.FC<LoginProps> = () => {
  const history = useHistory();
  const [data, handleChange] = useForm({
    email: "",
    password: "",
  });
  const [status, setStatus] = React.useState({
    isLoading: false,
    error: null,
  });
  React.useEffect(() => {
    setTimeout(() => {
      hasUser() && history.push("/materiales");
    }, 500);
  }, [history]);

  async function handleSubmit() {
    setStatus({ ...status, isLoading: true });
    try {
      const user = await authUserWithEmailAndPassword(
        data.email,
        data.password
      );
      console.log(user);
      setStatus({ ...status, isLoading: false });
      user && history.push("/materiales");
    } catch (error) {
      setStatus({ error, isLoading: false });
    }
  }
  return (
    <div className="w-2/3">
      <h1 className="mb-4">Inicio de sesión</h1>

      <Input
        label="Correo electronico"
        type="email"
        name="email"
        onChange={handleChange}
        value={data.email}
      />
      <Input
        type="password"
        label="Contraseña"
        name="password"
        onChange={handleChange}
        value={data.password}
      />
      {status.error && (
        <p className="text-red-500 text-sm mb-4">
          Usuario/contraseña incorrectos
        </p>
      )}
      {status.isLoading ? (
        <Loader />
      ) : (
        <Button onClick={handleSubmit} text="Iniciar sesion" type="primary" />
      )}
    </div>
  );
};
