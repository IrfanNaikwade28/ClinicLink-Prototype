import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { doctors as localDoctors } from '../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  // Always use same-origin in the mock app so MSW can intercept all requests.
  const backendUrl = "";

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
        setDoctors(localDoctors.map(d => ({ ...d, available: true, slots_booked: {} })))
      }
    } catch (error) {
      console.log(error);
      // Fallback to local mock data if API is unavailable
      setDoctors(localDoctors.map(d => ({ ...d, available: true, slots_booked: {} })))
    }
  }, [backendUrl]);

  const loadUserProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // If token is invalid/stale (e.g., after refresh with MSW), clear it silently
      const status = error?.response?.status
      if (status === 401 || status === 403) {
        localStorage.removeItem('token')
        setToken(false)
        setUserData(false)
      }
    }
  }, [backendUrl, token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, [getDoctorsData]);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token, loadUserProfileData]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

AppContextProvider.propTypes = {
  children: PropTypes.node,
}
