import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  setUser,
  setErrorMessage,
  setAuthLoading,
  useNotifier,
} from '../../global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useVerifyOtp = () => {
  const dispatch = useDispatch();
  const { addMessage } = useNotifier();
  const verifyOtp = async (otp, email) => {
    try {
      dispatch(setAuthLoading(true));
      const res = await axios.post(
        `${backendUrl}/auth/verifyOtp`,
        {
          otpCode: otp,
          email,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        dispatch(setUser(res.data.data));
        addMessage('Verify successfully !', 'success');
        return res?.data.data?.userName;
      }
    } catch (error) {
      dispatch(
        setErrorMessage(
          error.response?.data?.message || 'Verification failed !'
        )
      );
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
  return verifyOtp;
};

export default useVerifyOtp;
