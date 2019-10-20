import axios from "axios";

// Action Types
export const Types = {
  LOGIN_STARTED: "user/LOGIN_STARTED",
  LOGIN_SUCCESS: "user/LOGIN_SUCCESS",
  LOGIN_FAILED: "user/LOGIN_FAILED",
  REGISTER_STARTED: "user/REGISTER_STARTED",
  REGISTER_SUCCESS: "user/REGISTER_SUCCESS",
  REGISTER_FAILED: "user/REGISTER_FAILED",
  LOGOUT: "user/LOGOUT",
  UPDATE_USER: "user/UPDATE_USER",
  ADDREQUEST_SUCCESS: "user/ADDREQUEST_SUCCESS",
  GET_REQUESTS_SUCCESS: "user/GET_REQUESTS_SUCCESS",
  CHANGE_REQUEST_STATUS_SUCCESS: "user/CHANGE_REQUEST_STATUS_SUCCESS",
  UPDATE_USER_ENTITY_SUCCESS: "user/UPDATE_USER_ENTITY_SUCCESS"
};

// Reducer
const initialState = {
  id: localStorage.getItem("id"),
  name: "",
  email: "",
  password: "",
  is_entity: 0,
  state: "",
  organization: "",
  company_code: "",
  atuation: "",
  alertMessage: "",
  loading: false,
  request: {
    description: "",
    nro_needed: 0,
    atuation: "",
    state: ""
  },
  receivedRequests: []
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN_STARTED:
      return {
        ...state,
        loading: true
      };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        id: action.payload.id,
        state: action.payload.state,
        is_entity: action.payload.is_entity
      };
    case Types.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        alertMessage: action.payload.alertMessage
      };
    case Types.REGISTER_STARTED:
      return {
        ...state,
        loading: true
      };
    case Types.REGISTER_SUCCESS:
      return {
        id: "",
        name: "",
        email: "",
        password: "",
        is_entity: 0,
        state: "",
        organization: "",
        company_code: "",
        atuation: "",
        alertMessage: action.payload.alertMessage,
        loading: false,
        request: {
          description: "",
          nro_needed: 0,
          atuation: "",
          state: ""
        }
      };
    case Types.REGISTER_FAILED:
      return {
        id: "",
        name: "",
        email: "",
        password: "",
        is_entity: 0,
        state: "",
        organization: "",
        company_code: "",
        atuation: "",
        alertMessage: "",
        loading: false,
        request: {
          description: "",
          nro_needed: 0,
          atuation: "",
          state: ""
        }
      };
    case Types.LOGOUT:
      return {
        id: "",
        name: "",
        email: "",
        password: "",
        is_entity: 0,
        state: "",
        organization: "",
        company_code: "",
        atuation: "",
        alertMessage: "",
        loading: false,
        request: [
          {
            description: "",
            nro_needed: 0,
            atuation: "",
            state: ""
          }
        ]
      };
    case Types.UPDATE_USER:
      return {
        ...action.user
      };

    case Types.ADDREQUEST_SUCCESS:
      return {
        // ...action.users
        ...state,
        request: [
          {
            ...state.request,
            nro_needed: 0,
            atuation: "",
            state: ""
          }
        ]
      };
    case Types.UPDATE_USER_ENTITY_SUCCESS:
      return {
        ...state,
        is_entity: action.is_entity
      };
    case Types.GET_REQUESTS_SUCCESS:
      return {
        ...state,
        receivedRequests: action.payload.userRequests
      };

    case Types.CHANGE_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        receivedRequests: action.payload.userRequests
      };

    default:
      return state;
  }
}

// Action Creators
export function login(user, history, setShowAlertMessage) {
  return function(dispatch) {
    console.log("loginstarted");
    dispatch(loginStarted());
    axios
      .post("http://200.235.82.14:4000/autenticate", {
        email: user.email,
        password: user.password
      })
      .then(res => {
        const id = res.data.id;
        const state = res.data.state;
        const is_entity = res.data.is_entity;
        dispatch(loginSuccess(id, state, is_entity));
        console.log("Valid: " + res.data.valid);
        if (res.data.valid === true) {
          console.log("Login valido");
          localStorage.setItem("loginValid", "true");
          localStorage.setItem("id", id);
          if (is_entity) {
            history.push("/dashboard");
          } else {
            history.push("/volunteer");
          }
        } else {
          console.log("Login invalido");
          dispatch(loginFailed("Login inválido"));
          setShowAlertMessage(true);
        }
      })
      .catch(error => {
        console.log("Login invalido");
        dispatch(
          loginFailed(
            "Ocorreu um erro, tente novamente mais tarde. erro: " + error
          )
        );
        setShowAlertMessage(true);
      });
  };
}

const loginStarted = () => ({
  type: Types.LOGIN_STARTED
});

const loginSuccess = (id, state, is_entity) => ({
  type: Types.LOGIN_SUCCESS,
  payload: {
    id,
    state,
    is_entity
  }
});

const loginFailed = alertMessage => ({
  type: Types.LOGIN_FAILED,
  payload: {
    alertMessage
  }
});

export function register(user, setShowAlertMessage, handleChangeForm) {
  return function(dispatch) {
    console.log("registro started");
    dispatch(registerStarted());
    axios
      .post("http://200.235.82.14:4000/adduser", {
        name: user.name,
        email: user.email,
        login: user.login,
        password: user.password,
        organization: user.organization,
        is_entity: user.is_entity,
        state: user.state,
        company_code: user.company_code,
        atuation: user.atuation
      })
      .then(res => {
        dispatch(registerSuccess("Registrado com Sucesso!"));
        console.log("Registro valido");
        setShowAlertMessage(true);
        handleChangeForm();
      })
      .catch(error => {
        console.log("Registro invalido");
        dispatch(
          registerFailed(
            "Ocorreu um erro, tente novamente mais tarde. erro: " + error
          )
        );
        setShowAlertMessage(true);
      });
  };
}

const registerStarted = () => ({
  type: Types.REGISTER_STARTED
});

const registerSuccess = alertMessage => ({
  type: Types.REGISTER_SUCCESS,
  payload: {
    alertMessage
  }
});

const registerFailed = alertMessage => ({
  type: Types.REGISTER_FAILED,
  payload: {
    alertMessage
  }
});

export function logout(history) {
  return function(dispatch) {
    dispatch({
      type: Types.LOGOUT
    });
    localStorage.setItem("loginValid", "false");
    localStorage.removeItem("login");
    history.push("/");
  };
}

export function updateUser(user) {
  return {
    type: Types.UPDATE_USER,
    user
  };
}

export function addRequest(user) {
  return function(dispatch) {
    console.log("addrequest started");
    axios
      .post("http://200.235.82.14:4000/addrequest", {
        description: user.request.description,
        atuation: user.request.atuation,
        nro_needed: user.request.nro_needed,
        state: user.state
      })
      .then(res => {
        console.log("addrequest success");
        dispatch(addRequestSuccess());
      })
      .catch(error => {
        console.log("addrequest error");
      });
  };
}

const addRequestSuccess = () => {
  return {
    type: Types.ADDREQUEST_SUCCESS
  };
};

export function getRequests(id) {
  return function(dispatch) {
    console.log("getRequest started");
    axios
      .get("http://200.235.82.14:4000/userrequests/" + id)
      .then(res => {
        const userRequests = res.data;
        console.log("getRequest success: ");
        console.log(userRequests);
        dispatch(getRequestSuccess(userRequests));
      })
      .catch(error => {
        console.log("getRequest error: " + error);
      });
  };
}

const getRequestSuccess = userRequests => {
  return {
    type: Types.GET_REQUESTS_SUCCESS,
    payload: {
      userRequests
    }
  };
};

export function updateUserEntity(is_entity) {
  return {
    type: Types.UPDATE_USER_ENTITY_SUCCESS,
    is_entity
  };
}

export function changeRequestStatus(userId, requestId, status) {
  return function(dispatch) {
    console.log("changeRequestStatus started" + userId + requestId + status);
    axios
      .get(
        "http://200.235.82.14:4000/updatestatus/" +
          Number.parseInt(userId) +
          "/" +
          Number.parseInt(requestId) +
          "/" +
          Number.parseInt(status)
      )
      .then(res => {
        console.log("changeRequestStatus success: ");
        // dispatch(changeRequestStatusSuccess());
      })
      .catch(error => {
        console.log("changeRequestStatus error: " + error);
      });
  };
}

const changeRequestStatusSuccess = () => {};
