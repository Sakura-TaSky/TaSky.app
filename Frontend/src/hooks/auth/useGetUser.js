import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, setAppLoading } from '../../global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useGetUser = () => {
  const dispatch = useDispatch();
  const getUser = async () => {
    dispatch(setAppLoading(true));
    dispatch;
    try {
      const res = await axios.get(`${backendUrl}/auth/getUser`, {
        withCredentials: true,
      });
      if (res.data) {
        dispatch(setUser(res.data.data));
        return res.data.data.userName;
      }
      return false;
    } catch (error) {
      return false;
    } finally {
      dispatch(setAppLoading(false));
    }
  };
  return getUser;
};

export default useGetUser;
