import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  setUser,
  setAuthLoading,
  setErrorMessage,
  useNotifier,
  useOrgId,
  setOrg,
} from '../../global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useLogout = () => {
  const dispatch = useDispatch();
  const { addMessage } = useNotifier();
  const { setOrgId } = useOrgId();
  const logout = async () => {
    dispatch(setAuthLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        addMessage('Logout successfuly !', 'success');
        localStorage.removeItem('orgId');
        localStorage.removeItem('lastVisitedRoute');
        setOrgId(null);
        dispatch(setOrg(null));
        dispatch(setUser(null));
        return true;
      }
      addMessage('Logout failed !', 'error');
      return false;
    } catch (error) {
      dispatch(
        setErrorMessage(error.response?.data?.message || 'Logout failed !')
      );
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
  return logout;
};

export default useLogout;
