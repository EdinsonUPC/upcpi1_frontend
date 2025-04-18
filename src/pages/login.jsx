import LoginForm from "../login/loginForm";

function Login() {
  const handleLogin = ({ email, password, remember }) => {
    // Tu lógica de autenticación aquí
    console.log(email, password, remember);
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default Login;
