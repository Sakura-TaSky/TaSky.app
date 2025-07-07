import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthLoading, setErrorMessage, setUser } from '../../global';
import { useNotifier } from '../../global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useGetResetPassOtp = () => {
  const dispatch = useDispatch();
  const { addMessage } = useNotifier();
  const getResetPassOtp = async email => {
    dispatch(setAuthLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/auth/resetPasswordOtp`,
        email
      );
      if (res.data.data) {
        dispatch(setUser({ userEmail: res.data.data }));
        addMessage('otp sent successfuly', 'success');
        return true;
      } else {
        addMessage('somthing went Wrong ', 'error');
      }
    } catch (error) {
      dispatch(
        setErrorMessage(error.response?.data?.message || 'otp send failed !')
      );
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
  return getResetPassOtp;
};

export default useGetResetPassOtp;
