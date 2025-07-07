import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  setUser,
  setAuthLoading,
  setErrorMessage,
  useNotifier,
} from '../../global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useLogin = () => {
  const dispatch = useDispatch();
  const { addMessage } = useNotifier();
  const login = async data => {
    dispatch(setAuthLoading(true));
    try {
      const res = await axios.post(`${backendUrl}/auth/login`, data, {
        withCredentials: true,
      });
      if (res.data) {
        dispatch(setUser(res.data.data));
        addMessage('Login successfuly !', 'success');
        return {
          success: res?.data.data?.userName,
        };
      }
      addMessage('Login failed !', 'error');
      return {
        success: false,
      };
    } catch (error) {
      const res = error.response;
      if (res?.data?.needsVerification) {
        addMessage('Verify Email by otp', 'warning');
        dispatch(setUser({ userEmail: res.data.userEmail }));
        return {
          success: false,
          redirectToVerify: true,
          userEmail: res.data.userEmail,
        };
      }
      dispatch(
        setErrorMessage(error.response?.data?.message || 'Login failed !')
      );
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
  return login;
};

export default useLogin;
