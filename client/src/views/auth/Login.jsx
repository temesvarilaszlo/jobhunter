import { useEffect, useRef, useState } from "react";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/authApiSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const [sendLogin, result] = useLoginMutation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const { username, password } = credentials;

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (username === "") {
      newErrors.username = "Username is required";
    }
    if (password === "") {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);

    if (Object.values(newErrors).length > 0) {
      return;
    }

    const result = await sendLogin(credentials).unwrap();
    dispatch(
      login({
        user: result.user.email,
        token: result.accessToken,
      })
    );
    navigate("/", { replace: true });
  };

  // focus on load
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {result.isError && <p>Authentication error!</p>}
      <label htmlFor="username">Felhasználónév: </label>
      <input
        onInput={handleInput}
        ref={usernameRef}
        type="text"
        id="username"
        name="username"
        value={username}
        label="Felhasználónév"
      />
      {errors.username && <span>{errors.username}</span>}
      <br />
      <label htmlFor="password">Jelszó: </label>
      <input onInput={handleInput} type="password" id="password" name="password" value={password} label="Jelszó" />
      {errors.password && <span>{errors.password}</span>}
      <br />
      <button type="submit"> Elküld</button>
    </form>
  );
};
