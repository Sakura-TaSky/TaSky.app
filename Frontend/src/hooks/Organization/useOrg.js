import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNotifier,
  setOrg,
  setOrgLoading,
  setOrgErrorMessage,
  setUser,
  setMemberLoading,
  setMemberErrorMessage,
  setInviteLoading,
  setInviteErrorMessage,
} from '@/global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useOrg = () => {
  const { org } = useSelector(state => state.org);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { addMessage } = useNotifier();

  const getOrg = async orgId => {
    dispatch(setOrgLoading(true));
    try {
      const res = await axios.get(`${backendUrl}/getOrg/${orgId}`, {
        withCredentials: true,
      });
      if (res.data.data) {
        dispatch(setOrg(res.data.data));
        addMessage('organization selected successfully', 'success');
        return res?.data?.data._id;
      }
    } catch (error) {
      dispatch(
        setOrgErrorMessage(
          error.response?.data?.message || 'failed to get organization !'
        )
      );
      addMessage(
        error.response?.data?.message,
        'error' || 'failed to get organization !',
        'error'
      );
      return false;
    } finally {
      dispatch(setOrgLoading(false));
    }
  };

  const createOrg = async (data, orgId) => {
    dispatch(setOrgLoading(true));
    try {
      const formData = new FormData();
      if (data.orgName) {
        formData.append('orgName', data.orgName);
      }
      if (data.orgProfilePhoto) {
        formData.append('orgProfilePhoto', data.orgProfilePhoto);
      }
      if (data.description) {
        formData.append('description', data.description);
      }
      const res = await axios.post(`${backendUrl}/org/createOrg`, formData, {
        withCredentials: true,
      });
      if (res.data.data) {
        dispatch(
          setUser({
            ...user,
            inOrg: [...user.inOrg, res.data.data],
          })
        );
        addMessage('Organization created successfully', 'success');
        return res?.data?.data?.org._id;
      }
    } catch (error) {
      dispatch(
        setOrgErrorMessage(
          error.response?.data?.message || 'failed to create organization !'
        )
      );
      return false;
    } finally {
      dispatch(setOrgLoading(false));
    }
  };

  const UpdateOrg = async (data, orgId) => {
    dispatch(setOrgLoading(true));
    try {
      const formData = new FormData();
      if (data.orgName) {
        formData.append('orgName', data.orgName);
      }
      if (data.orgProfilePhoto) {
        formData.append('orgProfilePhoto', data.orgProfilePhoto);
      }
      if (data.description) {
        formData.append('description', data.description);
      }
      const res = await axios.put(
        `${backendUrl}/org/updateOrg/${orgId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        dispatch(
          setOrg({
            ...org,
            orgName: res?.data?.data?.orgName,
            orgProfilePhoto: res?.data?.data?.orgProfilePhoto,
            description: res?.data?.data?.description,
          })
        );
        addMessage('Organization updated successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setOrgErrorMessage(
          error.response?.data?.message || 'failed to Update organization !'
        )
      );
      return false;
    } finally {
      dispatch(setOrgLoading(false));
    }
  };

  const DeleteOrg = async (orgId, orgName) => {
    dispatch(setOrgLoading(true));
    try {
      const res = await axios.delete(`${backendUrl}/org/deleteOrg/${orgId}`, {
        data: { orgName },
        withCredentials: true,
      });
      if (res) {
        const updatedInOrg = user?.inOrg?.filter(o => o.org._id !== orgId);
        dispatch(
          setUser({
            ...user,
            inOrg: updatedInOrg,
          })
        );
        localStorage.removeItem('orgId');
        addMessage('Organization deleted successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setOrgErrorMessage(
          error.response?.data?.message || 'failed to DeleteOrg organization !'
        )
      );
      return false;
    } finally {
      dispatch(setOrgLoading(false));
    }
  };

  const inviteMemberToOrg = async data => {
    dispatch(setOrgLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/org/inviteMember/${org._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res) {
        addMessage('Invite sent successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setOrgErrorMessage(
          error.response?.data?.message || 'failed to invite Member !'
        )
      );
      addMessage(
        error.response?.data?.message,
        'error' || 'failed to invite Member !',
        'error'
      );
      return false;
    } finally {
      dispatch(setOrgLoading(false));
    }
  };

  const changeOrgMemberRole = async (data, memberId) => {
    dispatch(setMemberLoading(true));
    try {
      const res = await axios.patch(
        `${backendUrl}/org/${org._id}/changeOrgMemberRole/${memberId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const updatedUser = res.data.data;
        if (updatedUser && updatedUser.member && updatedUser.member._id) {
          const newMembers = org.members.map(m =>
            m.member._id === updatedUser.member._id ? updatedUser : m
          );

          dispatch(
            setOrg({
              ...org,
              members: newMembers,
            })
          );

          addMessage('Member role updated', 'success');
          return true;
        }
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

  const removeMemberFromOrg = async memberId => {
    dispatch(setMemberLoading(true));
    try {
      const res = await axios.delete(
        `${backendUrl}/org/${org._id}/removeMemberFromOrg/${memberId}`,
        {
          withCredentials: true,
        }
      );
      if (res) {
        const newMembers = org.members.filter(m => m.member._id !== memberId);
        const newTeams = org.teams.map(team => ({
          ...team,
          members: team.members.filter(m => m.member._id !== memberId),
        }));

        const newProjects = org.projects.map(project => ({
          ...project,
          members: project.members.filter(m => m.member._id !== memberId),
        }));

        dispatch(
          setOrg({
            ...org,
            members: newMembers,
            teams: newTeams,
            projects: newProjects,
          })
        );
        addMessage('Member removed', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setMemberErrorMessage(
          error.response?.data?.message || 'failed to remove member !'
        )
      );
      return false;
    } finally {
      dispatch(setMemberLoading(false));
    }
  };

  const transferOwnershipOfOrg = async memberId => {
    dispatch(setMemberLoading(true));
    try {
      const res = await axios.patch(
        `${backendUrl}/org/${org._id}/transferOwnershipOfOrg/${memberId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        dispatch(
          setOrg({
            ...org,
            members: res?.data?.data?.members,
            timeline: res?.data?.data?.timeline,
          })
        );
        addMessage('Ownership Transfer successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setMemberErrorMessage(
          error.response?.data?.message || 'failed to Transfer Ownership  !'
        )
      );
      return false;
    } finally {
      dispatch(setMemberLoading(false));
    }
  };

  const acceptInviteForOrg = async inviteId => {
    dispatch(setInviteLoading(true));
    try {
      const res = await axios.patch(
        `${backendUrl}/org/acceptInviteForOrg/${inviteId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const newInvitation = user.invites.filter(i => (i = i._id != inviteId));
        const newInOrg = [...user.inOrg, res?.data?.data];
        dispatch(
          setUser({
            ...user,
            invites: newInvitation,
            inOrg: newInOrg,
          })
        );
        addMessage('Invitation accepted successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setInviteErrorMessage(
          error.response?.data?.message || 'failed to accepte Invitation !'
        )
      );
      return false;
    } finally {
      dispatch(setInviteLoading(false));
    }
  };

  const declineInviteForOrg = async inviteId => {
    dispatch(setInviteLoading(true));
    try {
      const res = await axios.delete(
        `${backendUrl}/org/declineInviteForOrg/${inviteId}`,
        {
          withCredentials: true,
        }
      );
      if (res) {
        console.log(res);
        const newInvitation = user.invites.filter(i => (i = i._id != inviteId));
        dispatch(
          setUser({
            ...user,
            invites: newInvitation,
          })
        );
        addMessage('Invitation rejected successfully', 'success');
        return true;
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setInviteErrorMessage(
          error.response?.data?.message || 'failed to reject Invitation   !'
        )
      );
      return false;
    } finally {
      dispatch(setInviteLoading(false));
    }
  };

  const leaveOrg = async orgId => {
    dispatch(setOrgLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/org/${orgId}/leaveOrg`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res) {
        const newOrg = user.inOrg.filter(o => o.org._id !== orgId);
        dispatch(
          setUser({
            ...user,
            inOrg: newOrg,
          })
        );
        localStorage.removeItem('orgId');
        addMessage('Organization leaved successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(
        setOrgErrorMessage(
          error.response?.data?.message || 'failed to leaved organization !'
        )
      );
      return false;
    } finally {
      dispatch(setOrgLoading(false));
    }
  };

  return {
    getOrg,
    createOrg,
    UpdateOrg,
    DeleteOrg,
    inviteMemberToOrg,
    changeOrgMemberRole,
    removeMemberFromOrg,
    transferOwnershipOfOrg,
    acceptInviteForOrg,
    declineInviteForOrg,
    leaveOrg,
  };
};

export default useOrg;
