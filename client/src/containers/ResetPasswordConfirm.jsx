import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { reset_password_confirm } from "../redux/actions/auth";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import useSound from "use-sound";
import Click from "../assets/sound/click.mp3";
import { toast } from "react-toastify";

const ResetPasswordConfirm = () => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const [requestSent, setRequestSent] = useState(false)

  const { uid, token } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [play] = useSound(Click);

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(new_password === re_new_password){
      dispatch(reset_password_confirm(uid, token, new_password, re_new_password));
      setRequestSent(true);
    } else {
      toast.error('Las contraseñas deben coincidir.')
    }
  };

  if (typeof isAuthenticated === "undefined") {
    return null;
  }

  if (requestSent) {
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
              type="password"
              placeholder="Nueva contraseña"
              name="new_password"
              value={new_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="input-form">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              name="re_new_password"
              value={re_new_password}
              onChange={(e) => onChange(e)}
              minLength="6"
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

export default ResetPasswordConfirm;
