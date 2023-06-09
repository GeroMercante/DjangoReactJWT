import { createGlobalStyle } from "styled-components";

import Oswald from "../assets/fonts/Oswald.ttf";


const GlobalStyles = createGlobalStyle`
    *,*::before,*::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    @font-face {
        font-family: 'Oswald', sans-serif;
        src: url(${Oswald});
    }

    body{
        font-family: 'Oswald', sans-serif;
        overflow-x: hidden;
        scroll-behavior: smooth;
        margin: 0;
        padding: 0;
    }

    h1,h2,
    h3,h4,
    h5,h6,
    p,a,
    button{
        margin: 0;
        padding: 0;
    }

    a{
        color: inherit;
        text-decoration: none;
    }

    li{
      list-style: none;
    }

    button{
      border: none;
      outline: none;
    }
`;

export default GlobalStyles;
