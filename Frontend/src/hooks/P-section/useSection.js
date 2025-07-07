import {
  setOrg,
  setProject,
  setSectionErrorMessage,
  setSectionLoading,
  useNotifier,
} from '@/global';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useSection = () => {
  const { addMessage } = useNotifier();
  const dispatch = useDispatch();
  const { section } = useSelector(state => state.section);
  const { project } = useSelector(state => state.project);
  const { org } = useSelector(state => state.org);

  const createSection = async data => {
    dispatch(setSectionLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/section/${org?._id}/${project?._id}/createSection`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const newSection = res.data.data;
        dispatch(
          setProject({
            ...project,
            projectSections: [...project.projectSections, newSection],
          })
        );
        const updatedProjectInOrg = org?.projects?.map(p => {
          if (p._id == project?._id) {
            return {
              ...p,
              projectSections: [...p.projectSections, newSection],
            };
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updatedProjectInOrg,
          })
        );
        addMessage('Section created successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setSectionErrorMessage(
          error.response?.data?.message || 'failed to create section !'
        )
      );
      return false;
    } finally {
      dispatch(setSectionLoading(false));
    }
  };

  const updateSection = async (data, sectionId) => {
    dispatch(setSectionLoading(true));
    try {
      const res = await axios.put(
        `${backendUrl}/section/${org?._id}/${project?._id}/updateSection/${sectionId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const newSection = res.data.data;
        const updatedSectionInProject = project.projectSections.map(s => {
          if (s._id === sectionId) {
            return {
              ...s,
              sectionName: newSection.sectionName,
              description: newSection.description,
            };
          }
          return s;
        });
        dispatch(
          setProject({
            ...project,
            projectSections: updatedSectionInProject,
          })
        );
        const updatedProjectInOrg = org?.projects?.map(p => {
          if (p._id == project?._id) {
            return {
              ...p,
              projectSections: updatedSectionInProject,
            };
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updatedProjectInOrg,
          })
        );
        addMessage('Section updated successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setSectionErrorMessage(
          error.response?.data?.message || 'failed to update section !'
        )
      );
      return false;
    } finally {
      dispatch(setSectionLoading(false));
    }
  };

  const deleteSection = async sectionId => {
    dispatch(setSectionLoading(true));
    try {
      const res = await axios.delete(
        `${backendUrl}/section/${org?._id}/${project?._id}/deleteSection/${sectionId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        const updatedSectionInProject = project.projectSections.filter(
          s => s._id !== sectionId
        );
        dispatch(
          setProject({
            ...project,
            projectSections: updatedSectionInProject,
          })
        );
        const updatedProjectInOrg = org?.projects?.map(p => {
          if (p._id == project?._id) {
            return {
              ...p,
              projectSections: updatedSectionInProject,
            };
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updatedProjectInOrg,
          })
        );
        addMessage('Section delete successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setSectionErrorMessage(
          error.response?.data?.message || 'failed to delete section !'
        )
      );
      return false;
    } finally {
      dispatch(setSectionLoading(false));
    }
  };

  return {
    createSection,
    updateSection,
    deleteSection,
  };
};

export default useSection;
