import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthLoading, setErrorMessage } from '../../global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useResendOtp = () => {
  const dispatch = useDispatch();
  const resendOtp = async email => {
    try {
      dispatch(setAuthLoading(true));
      const res = await axios.put(`${backendUrl}/auth/resendOtp`, { email });
      if (res.data) {
        return true;
      }
    } catch (error) {
      dispatch(
        setErrorMessage(error.response?.data?.message || 'otp resend failed !')
      );
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
  return resendOtp;
};

export default useResendOtp;
