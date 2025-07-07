import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, setErrorMessage, setAuthLoading } from '../../global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useSingUp = () => {
  const dispatch = useDispatch();
  const singUp = async data => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    dispatch(setAuthLoading(true));
    try {
      const res = await axios.post(`${backendUrl}/auth/register`, formData);
      if (res.data) {
        dispatch(setUser(res.data.data));
        return true;
      }
      dispatch(setErrorMessage('Sing failed !'));
      return false;
    } catch (error) {
      dispatch(
        setErrorMessage(error.response?.data?.message || 'Sing failed !')
      );
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
  return singUp;
};

export default useSingUp;
