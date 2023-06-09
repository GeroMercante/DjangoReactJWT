import React, { useState, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import {
  AiOutlineLinkedin,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";

import useSound from "use-sound";
import Click from "../assets/sound/click.mp3";

import Logo from "../assets/logojwt.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth";

const NavBar = () => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [play] = useSound(Click);

  const changePosition = () => {
    if (window.scrollY >= 40) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  window.addEventListener("scroll", changePosition);
  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <>
      <Container>
        <header className="header">
          <div className="social-media">
            <section className="data-contain">
              <span>
                <i>
                  <a href="mailto:mercantegero@gmail.com">
                    mercantegero@gmail.com
                  </a>
                </i>
              </span>
              <span>
                <i>
                  <a href="tel:">(+54) 2345-653853</a>
                </i>
              </span>
            </section>
            <section className="social-contain">
              <span>
                <a
                  href="https://www.facebook.com/hoteln26"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineFacebook />
                </a>
              </span>
              <span>
                <a
                  href="https://www.instagram.com/hoteln26/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineInstagram />
                </a>
              </span>
              <span>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <AiOutlineLinkedin />
                </a>
              </span>
            </section>
          </div>
        </header>
        <nav id={navbar ? "headerOut" : "header"}>
          <div className={navbar ? "topnav widthMax" : "topnav"} id="myTopnav">
            <div className="logo-container">
              <Link to="/" onClick={play}>
                <img src={Logo} alt="Hotel N26" />
                <p>JWT Authentication</p>
              </Link>
            </div>
            <li onClick={play}>
              <Link to="/" className={`${pathMathRoute("/") && "border-b"}`}>
                Inicio
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li onClick={play}>
                  <Link onClick={() => logoutHandler()}>Cerrar sesión</Link>
                </li>
              </>
            ) : (
              <>
                <li onClick={play}>
                  <Link
                    to="/login"
                    className={`${pathMathRoute("/login") && "border-b"}`}
                  >
                    Login
                  </Link>
                </li>
                <li onClick={play}>
                  <Link
                    to="/signup"
                    className={`${pathMathRoute("/signup") && "border-b"}`}
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
            <li className="resize-navbar" onClick={play}>
              <Link
                to="/contacto"
                className={`${pathMathRoute("/contacto") && "border-b"}`}
              >
                Contacto
              </Link>
            </li>
          </div>
        </nav>
      </Container>
    </>
  );
};

const Container = styled.div`
  .header {
    width: 100%;
    height: 75px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgb(0, 0, 0);
    backdrop-filter: blur(1px);
    padding: 0rem 0;
    padding-bottom: 1rem;
    transition: 10s ease-in-out;
    z-index: 20;
    border-bottom: 3px solid #858585;

    .social-media {
      width: 100%;
      text-align: center;
      display: flex;
      padding: 0.3rem 3rem;
      align-items: center;
      justify-content: space-between;
      @media screen and (max-width: 893px) {
        justify-content: center;
      }
    }
    .data-contain {
      margin: 0 17px;
      margin-left: 130px;
      color: #fff;
      font-family: "Poppins", sans-serif;
      transition: 150ms ease-in-out;
      span a {
        padding: 0 1rem;
        :hover {
          color: purple;
        }
      }
    }
    .social-contain {
      margin: 0 17px;
      margin-right: 140px;
      color: black;
      color: #fff;
      span a {
        padding: 0 0.3rem;
        font-size: 30px;
        transition: 150ms;
        :hover {
          color: purple;
        }
      }
      @media screen and (max-width: 893px) {
        margin-right: 0;
      }
    }
  }
  @media (max-width: 893px) {
    .header section:nth-child(1) {
      display: none;
    }
  }
  #header {
    position: fixed;
    top: 2.8rem;
    width: 100%;
    transition: 0.5s ease-in-out;
    z-index: 20;
    @media screen and (max-width: 1230px) {
      top: 3rem;
    }
  }
  .headerOut {
    top: 0%;
    transition: 0.5s ease-in-out;
  }
  .topnav {
    position: relative;
    z-index: 20;
    background-color: #111111;
    border-radius: 10px;
    height: 90px;
    width: 80%;
    margin: auto;
    box-shadow: 0px 6px 16px -6px rgba(1, 1, 1, 0.4);
    transition: 0.5s ease-in-out;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 3rem;
    border-bottom: 4px solid #fff;
    border-top: 2px solid #fff;
    @media screen and (max-width: 1330px) {
      height: 75px;
    }
  }
  .logo-container {
    position: absolute;
    z-index: 20;
    left: 15px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      position: absolute;
      width: 350px;
      left: 15%;
      font-size: 16px;
      margin-top: 34px;
    }
  }
  .logo-container img {
    width: 70px;
    height: 70px;
    z-index: 20;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 7px;
  }
  .svg-contain {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 5%;
    gap: 0.5rem;
    padding: 6px 12px;
    border-radius: 50px;
    background: #ffe4a0;
  }
  .widthMax {
    width: 100%;
    position: fixed;
    border-radius: 0px;
    top: 0;
    left: 0;
    right: 0;
    transition: 0.5s ease-in-out;
  }
  .topnav a {
    color: #dcdcdc;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    top: 10px;
    transition: 150ms ease-in-out;
    text-transform: uppercase;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    width: fit-content;
    align-items: center;
    :hover {
      color: #fff;
      text-shadow: 0 10px 40px #fff;
    }
    @media screen and (max-width: 1330px) {
      font-size: 17px;
    }
  }
  .resize-navbar {
    margin-right: 6rem;
  }
  .border-b {
    color: #fff !important;
  }
  #icon {
    float: right;
  }
  #active {
    display: flex;
  }
  #active img {
    width: 130px;
  }
  #active:hover {
    color: #fff;
  }
  .topnav .icon {
    display: none;
  }
`;

export default NavBar;
