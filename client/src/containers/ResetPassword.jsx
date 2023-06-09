import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { reset_password } from "../redux/actions/auth";

import styled from "styled-components";

import useSound from "use-sound";
import Click from "../assets/sound/click.mp3";

const ResetPassword = () => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [play] = useSound(Click);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(reset_password(email));
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
        <h1>Reestablecer contraseña</h1>
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
          <button type="submit" onClick={play}>
            Reestablecer contraseña
          </button>
        </form>
        <div></div>
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
`;

export default ResetPassword;
