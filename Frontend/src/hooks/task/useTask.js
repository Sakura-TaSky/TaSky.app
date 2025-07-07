import { setTaskErrorMessage, setTaskLoading } from '@/global';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useTask = () => {
  const dispatch = useDispatch();
  const { addMessage } = useNotifier();
  const { org } = useSelector(state => state.org);
  const { user } = useSelector(state => state.auth);
  const { project } = useSelector(state => state.project);
  const { section } = useSelector(state => state.section);
  const { task } = useSelector(state => state.task);

  const createTask = async () => {
    dispatch(setTaskLoading(true));
    try {
    } catch (error) {
      dispatch(
        setTaskErrorMessage(
          error.response?.data?.message || 'failed to create Task !'
        )
      );
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  return {
    createTask,
  };
};

export default useTask;
