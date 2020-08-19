import axios from 'axios';

export const setJWTToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export const logout = async () => {
  localStorage.removeItem("jwtToken")
  setJWTToken();
}