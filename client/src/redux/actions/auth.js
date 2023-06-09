import axios from "axios";
import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_CONFIRM_SUCCESS,
  USER_RESET_PASSWORD_CONFIRM_FAIL,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_ACTIVATE_ACCOUNT_SUCCESS,
  USER_ACTIVATE_ACCOUNT_FAIL,
  LOGOUT,
} from "../types";
import { toast } from "react-toastify";

//   Cargar usuario - Obtener token localStorage.
// ! Cargar usuario - Obtener token localStorage.
//   Cargar usuario - Obtener token localStorage.

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    console.log(localStorage.getItem("access"));
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );

      console.log(res);
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  }
};

export const googleAuthenticated = (state, code) => async dispatch => {
  if(state && code && !localStorage.getItem('access')){
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const details = {
      'state': state,
      'code': code,
    };

    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]).join('&'));

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);

      
    } catch (err) {
      console.log(err)
    }
  }
}


//   Verificar usuario - token en localStorage.
// ! Verificar usuario - token en localStorage.
//   Verificar usuario - token en localStorage.
export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );
      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

//   Inicio de sesión del usuario.
// ! Inicio de sesión del usuario.
//   Inicio de sesión del usuario.
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`,body,config);

    dispatch({
      type: USER_LOGIN,
      payload: res.data,
    });

    dispatch(load_user());
    toast.success("Has iniciado sesión correctamente.");
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_LOGIN_FAIL,
    });
    toast.error("La contraseña o usuario no existen en nuestra base de datos.");
  }
};


//   Registro de usuario.
// ! Registro de usuario.
//   Registro de usuario.
export const signup = (name, email, password, re_password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password, re_password });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
    toast.success("Registro éxitosamente. Por favor, revisa tu correo y verifica tu cuenta.");
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_SIGNUP_FAIL,
    });
    toast.error("Autoriza mails SMTP para poder registrarte en esta base de datos.");
  }
};


//   Verificar correo electronico - Protocolo SMTP - modo Debug.
// ! Verificar correo electronico - Protocolo SMTP - modo Debug.
//   Verificar correo electronico - Protocolo SMTP - modo Debug.
export const verify = (uid, token) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
    dispatch({
      type: USER_ACTIVATE_ACCOUNT_SUCCESS,
    });
    dispatch(load_user());
    toast.success("¡Cuenta verificada éxitosamente, inicia sesión!");
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ACTIVATE_ACCOUNT_FAIL,
    });
    toast.error("No se ha podido verificar el usuario.");
  }
}

//   Reiniciar constraseña usuario.
// ! Reiniciar constraseña usuario.
//   Reiniciar constraseña usuario.
export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
      body,
      config
    );

    dispatch({
      type: USER_RESET_PASSWORD_SUCCESS,
    });
    toast.success(
      "Token enviado. Revisa tu correo eléctronico. No lo compartas con nadie."
    );
  } catch (err) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
    });
    toast.error(
      "Algo salio mal, o esa cuenta no existe o se ha borrado de nuestra base de datos."
    );
  }
};

//   Confirmar reinicio de la constraseña del usuario.
// ! Confirmar reinicio de la constraseña del usuario.
//   Confirmar reinicio de la constraseña del usuario.
export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );

      dispatch({
        type: USER_RESET_PASSWORD_CONFIRM_SUCCESS,
      });
      toast.success("Se ha cambiado la clave, por favor, inicie sesión.");
    } catch (err) {
      dispatch({
        type: USER_RESET_PASSWORD_CONFIRM_FAIL,
      });
      toast.error(
        "Algo salió mal. Verifique que las contraseñas sean identicas."
      );
    }
  };

//   Cerrar sesión. Setea initialState en null y strings vacíos.
// ! Cerrar sesión. Setea initialState en null y strings vacíos.
//   Cerrar sesión. Setea initialState en null y strings vacíos.
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
