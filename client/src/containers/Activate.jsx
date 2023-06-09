import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { verify } from "../redux/actions/auth";

import styled from "styled-components";

import useSound from "use-sound";
import Click from "../assets/sound/click.mp3";

const Activate = () => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [play] = useSound(Click);

  const [verified, setVerified] = useState(false);

  const { uid, token } = useParams();

  const verify_account = (e) => {
    dispatch(verify(uid, token));
    setVerified(true);
  };

  if (typeof isAuthenticated === "undefined") {
    return null;
  }

  if (verified) {
    navigate("/login");
    return null;
  }

  return (
    <BoxActivate>
      <Modal>
        <h1>Verificar tu cuenta:</h1>
        <div onClick={play}>
          <button type="button" onClick={verify_account}>Verificar cuenta</button>
        </div>
      </Modal>
    </BoxActivate>
  );
};

const BoxActivate = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Modal = styled.div`
  height: 250px;
  width: 350px;
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-radius: 16px;
  padding: 7px 14px;
  gap: 30px 0;
  button{
    width: 250px;
    text-align: center;
    padding: 11px 7px;
    border-radius: 16px;
    font-size: 19px;
    cursor: pointer;
  }
`;

export default Activate;
