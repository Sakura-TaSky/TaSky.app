import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthLoading, setErrorMessage, setUser } from '../../global';
import { useNotifier } from '../../global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useResetPassword = () => {
  const dispatch = useDispatch();
  const { addMessage } = useNotifier();
  const resetPassword = async (otpCode, password, email) => {
    dispatch(setAuthLoading(true));
    try {
      const res = await axios.put(`${backendUrl}/auth/forgotPassword`, {
        otpCode,
        password,
        email,
      });
      if (res.data) {
        addMessage('password reset successfuly', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setErrorMessage(
          error.response?.data?.message || 'reset password failed !'
        )
      );
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
  return resetPassword;
};

export default useResetPassword;
