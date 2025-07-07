import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  updateUserProfile,
  setErrorMessage,
  setAuthLoading,
  useNotifier,
} from '../../global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useUpadteUser = () => {
  const dispatch = useDispatch();
  const { addMessage } = useNotifier();
  const updateUser = async data => {
    try {
      dispatch(setAuthLoading(true));
      const formData = new FormData();
      if (data.userName) {
        formData.append('userName', data.userName);
      }
      if (data.profilePhoto) {
        formData.append('profilePhoto', data.profilePhoto);
      }
      const res = await axios.put(`${backendUrl}/auth/updateUser`, formData, {
        withCredentials: true,
      });
      dispatch(
        updateUserProfile({
          userName: res.data?.data?.userName,
          profilePhoto: res.data?.data?.profilePhoto,
        })
      );
      addMessage('Profile Updated successfully', 'success');
      return true;
    } catch (error) {
      dispatch(
        setErrorMessage(
          error.response?.data?.message || 'profile Update failed !'
        )
      );
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
  return updateUser;
};

export default useUpadteUser;
