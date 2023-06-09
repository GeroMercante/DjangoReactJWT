import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/auth";

import styled from "styled-components";

import useSound from "use-sound";
import Click from "../assets/sound/click.mp3";

import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [play] = useSound(Click);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const continueWithGoogle = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:8000`)
      window.location.replace(res.data.authorization_url);
      
    } catch(err){
      console.log(err)
      toast.error('No fue posible autenticarse con Gluglu')
    }
  };

  if (typeof isAuthenticated === "undefined") {
    return null;
  }

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <BoxLogin>
      <Modal>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="input-form">
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="input-form">
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button type="submit" onClick={play}>
            Iniciar sesión
          </button>
        </form>
        <button className="oauth" onClick={continueWithGoogle}>
          <FcGoogle /> Iniciar sesión con Google
        </button>
        <div>
          <p>
            ¿No tienes una cuenta? <Link to="/signup">Registrate aquí.</Link>
          </p>
          <div></div>
          <p>
            ¿Olvidó su contraseña?{" "}
            <Link to="/reset-password">Restablecer contraseña.</Link>
          </p>
        </div>
      </Modal>
    </BoxLogin>
  );
};

const BoxLogin = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Modal = styled.div`
  height: 500px;
  width: 400px;
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-radius: 16px;
  padding: 7px 14px;

  form {
    background: #3c3c3c;
    padding: 11px;
    border-radius: 8px;

    input {
      width: 350px;
      padding: 11px 8px;
      margin: 10px 0;
      border-radius: 8px;
      outline: none;
      border: none;
      font-size: 19px;
    }
    button {
      border: none;
      outline: none;
      width: 180px;
      font-size: 19px;
      padding: 11px 8px;
      border-radius: 8px;
      font-size: 19px;
      cursor: pointer;
      transition: 0.2s;
      margin-top: 1rem;
      :hover {
        background: #dcdcdc;
      }
    }
  }
  p {
    color: #bfbfbf;
    margin: 4px 0;
    a {
      color: #fff;
      border-bottom: 1px solid #fff;
    }
  }

  .oauth {
    width: 100%;
    background: #ec0000;
    padding: 11px 8px;
    border-radius: 16px;
    font-size: 19px;
    cursor: pointer;
    transition: 0.2s;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 0 10px;
    color: #fff;
    :hover {
      background: #970000;
    }
  }
`;

export default Login;
