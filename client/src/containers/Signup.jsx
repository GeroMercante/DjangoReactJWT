import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { signup } from "../redux/actions/auth";

import styled from "styled-components";

import useSound from "use-sound";
import Click from "../assets/sound/click.mp3";
import { toast } from "react-toastify";

const Signup = () => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [play] = useSound(Click);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { name, email, password, re_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      dispatch(signup(name, email, password, re_password));
    } else {
      toast.error("Las contraseñas deben coincidir");
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
        <h1>Registrarse</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="input-form">
            <input
              type="text"
              placeholder="Nombre completo"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="input-form">
            <input
              type="email"
              placeholder="Correo electrónico"
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
          <div className="input-form">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              name="re_password"
              value={re_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button type="submit" onClick={play}>
            Registrarse
          </button>
        </form>
        <div>
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí.</Link>
          </p>
          <div></div>
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
`;

export default Signup;
