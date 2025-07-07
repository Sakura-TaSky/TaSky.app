import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMemberErrorMessage,
  setMemberLoading,
  setOrg,
  setProject,
  setProjectErrorMessage,
  setProjectLoading,
  setUser,
  useNotifier,
} from '@/global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useProject = () => {
  const dispatch = useDispatch();
  const { addMessage } = useNotifier();
  const { org } = useSelector(state => state.org);
  const { user } = useSelector(state => state.auth);
  const { project } = useSelector(state => state.project);

  const createProject = async data => {
    dispatch(setProjectLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/project/${org?._id}/createProject`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const newProject = res.data.data;
        dispatch(
          setOrg({
            ...org,
            projects: [...org.projects, newProject],
          })
        );
        dispatch(
          setUser({
            ...user,
            inProject: [...user.inProject, { project: newProject }],
          })
        );
        addMessage('project Created successfully !', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setProjectErrorMessage(
          error.response?.data?.message || 'failed to create Project !'
        )
      );
      return false;
    } finally {
      dispatch(setProjectLoading(false));
    }
  };

  const deleteProject = async projectId => {
    dispatch(setProjectLoading(true));
    try {
      const res = await axios.delete(
        `${backendUrl}/project/${org?._id}/deleteProject/${projectId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        const updatedProjectInorg = org.projects.filter(
          p => p._id !== projectId
        );
        const updatedProjectInUser = user.inProject.filter(
          p => p.project._id !== projectId
        );
        dispatch(
          setOrg({
            ...org,
            projects: updatedProjectInorg,
          })
        );
        dispatch(
          setUser({
            ...user,
            inProject: updatedProjectInUser,
          })
        );
        dispatch(setProject(null));
        addMessage('project Deleted successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setProjectErrorMessage(
          error.response?.data?.message || 'failed to delete Project !'
        )
      );
      return false;
    } finally {
      dispatch(setProjectLoading(false));
    }
  };

  const updateProject = async (data, projectId) => {
    dispatch(setProjectLoading(true));
    try {
      const res = await axios.put(
        `${backendUrl}/project/${org?._id}/updateProject/${projectId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const newProject = res.data.data;
        const updatedProjectInorg = org.projects.map(p =>
          p._id === projectId ? newProject : p
        );
        const updatedProjectInUser = user.inProject.map(p =>
          p.project._id == projectId ? { project: newProject } : p
        );
        dispatch(
          setOrg({
            ...org,
            projects: updatedProjectInorg,
          })
        );
        dispatch(
          setUser({
            ...user,
            inProject: updatedProjectInUser,
          })
        );
        dispatch(setProject(newProject));
        addMessage('project updated successfully !', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setProjectErrorMessage(
          error.response?.data?.message || 'failed to update Project !'
        )
      );
      return false;
    } finally {
      dispatch(setProjectLoading(false));
    }
  };

  const addMemberInProject = async (data, projectId) => {
    dispatch(setProjectLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/project/${org?._id}/addMemberInProject/${projectId}/${data.memberId}`,
        {
          asRoleOf: data.asRoleOf,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const newMember = res.data.data;
        dispatch(
          setProject({
            ...project,
            members: [...project.members, newMember],
          })
        );
        const updatedProjects = org?.projects.map(p => {
          if (p._id == projectId) {
            return {
              ...p,
              members: [...p.members, newMember],
            };
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updatedProjects,
          })
        );
        addMessage('Member added successfully !', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setProjectErrorMessage(
          error.response?.data?.message || 'failed to add member !'
        )
      );
      return false;
    } finally {
      dispatch(setProjectLoading(false));
    }
  };

  const changeProjectMemberRole = async (data, memberId) => {
    dispatch(setMemberLoading(true));
    try {
      const res = await axios.patch(
        `${backendUrl}/project/${org?._id}/changeProjectMemberRole/${project?._id}/${memberId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const updatedMember = res.data.data;
        const newMembers = project?.members.map(m =>
          m._id === updatedMember._id ? updatedMember : m
        );
        dispatch(
          setProject({
            ...project,
            members: newMembers,
          })
        );
        const updatedOrgProject = org.projects.map(p => {
          if (p._id == project._id) {
            return {
              ...p,
              members: newMembers,
            };
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updatedOrgProject,
          })
        );
        addMessage('Member role updated', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setMemberErrorMessage(
          error.response?.data?.message || 'failed to change Member Role !'
        )
      );
      return false;
    } finally {
      dispatch(setMemberLoading(false));
    }
  };

  const removeMemberFromProject = async memberId => {
    dispatch(setMemberLoading(true));
    try {
      const res = await axios.delete(
        `${backendUrl}/project/${org?._id}/removeMemberFromProject/${project?._id}/${memberId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        const newProjectMembers = project.members.filter(
          m => m.member._id !== memberId
        );
        dispatch(
          setProject({
            ...project,
            members: newProjectMembers,
          })
        );
        const updatedOrgProject = org.projects.map(p => {
          if (p._id == project._id) {
            return {
              ...p,
              members: newProjectMembers,
            };
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updatedOrgProject,
          })
        );
        addMessage('Member deleted successfully !', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setMemberErrorMessage(
          error.response?.data?.message || 'failed to delete member !'
        )
      );
      return false;
    } finally {
      dispatch(setMemberLoading(false));
    }
  };

  const transferOwnershipOfProject = async memberId => {
    dispatch(setMemberLoading(true));
    try {
      const res = await axios.patch(
        `${backendUrl}/project/${org?._id}/transferOwnershipOfProject/${project?._id}/${memberId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const updatedMember = res.data.data;
        dispatch(
          setProject({
            ...project,
            members: updatedMember,
          })
        );
        const updateOrgProject = org.projects.map(p => {
          if (p._id == project._id) {
            return {
              ...p,
              members: updatedMember,
            };
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updateOrgProject,
          })
        );
        addMessage('Ownership Transfer successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setMemberErrorMessage(
          error.response?.data?.message || 'failed to Transfer Ownership !'
        )
      );
      return false;
    } finally {
      dispatch(setMemberLoading(false));
    }
  };

  const addTeamInProject = async data => {
    dispatch(setProjectLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/project/${org?._id}/addTeamInProject/${project._id}/${data.teamId}`,
        {
          asRoleOf: data.asRoleOf,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const addedTeam = res.data.data;
        dispatch(
          setProject({
            ...project,
            teams: [...project.teams, addedTeam],
          })
        );
        const updatedOrgProject = org.projects.map(p => {
          if (p._id == project._id) {
            return {
              ...p,
              teams: [...p.teams, addedTeam],
            };
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updatedOrgProject,
          })
        );
        addMessage('Team added successfully !', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setProjectErrorMessage(
          error.response?.data?.message || 'failed to add team !'
        )
      );
      return false;
    } finally {
      dispatch(setProjectLoading(false));
    }
  };

  const removeTeamFromProject = async teamId => {
    dispatch(setProjectLoading(true));
    try {
      const res = await axios.delete(
        `${backendUrl}/project/${org?._id}/removeTeamFromProject/${project._id}/${teamId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        const newProjectTeam = project.teams.filter(t => t._id !== teamId);
        dispatch(
          setProject({
            ...project,
            teams: newProjectTeam,
          })
        );
        const updatedOrgProject = org.projects.map(p => {
          if (p._id == project._id) {
            return {
              ...p,
              teams: newProjectTeam,
            };
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updatedOrgProject,
          })
        );
        addMessage('Team removed successfully !', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setProjectErrorMessage(
          error.response?.data?.message || 'failed to remove team !'
        )
      );
      return false;
    } finally {
      dispatch(setProjectLoading(false));
    }
  };

  const leaveProject = async () => {
    dispatch(setProjectLoading(true));
    try {
      const res = await axios.patch(
        `${backendUrl}/project/${org?._id}/leaveProject/${project?._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        const newProejctInUser = user.inProject.filter(
          p => p.project._id !== project._id
        );
        dispatch(
          setUser({
            ...user,
            inProject: newProejctInUser,
          })
        );
        dispatch(setProject(null));
        const updatedProjectMembers = project.members.filter(
          m => m.member._id !== user._id
        );
        const updatedOrgProject = org.projects.map(p => {
          if (p._id == project._id) {
            return {
              ...p,
              members: updatedProjectMembers,
            };
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updatedOrgProject,
          })
        );
        addMessage('Ownership Transfer successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setProjectErrorMessage(
          error.response?.data?.message || 'failed to Transfer Ownership !'
        )
      );
      return false;
    } finally {
      dispatch(setProjectLoading(false));
    }
  };

  return {
    createProject,
    deleteProject,
    updateProject,
    addMemberInProject,
    changeProjectMemberRole,
    removeMemberFromProject,
    transferOwnershipOfProject,
    addTeamInProject,
    removeTeamFromProject,
    leaveProject,
  };
};

export default useProject;
