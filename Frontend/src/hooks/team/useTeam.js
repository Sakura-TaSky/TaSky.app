import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInviteErrorMessage,
  setInviteLoading,
  setMemberErrorMessage,
  setMemberLoading,
  setOrg,
  setTeam,
  setTeamErrorMessage,
  setTeamLoading,
  setUser,
  updateUserProfile,
  useNotifier,
} from '@/global';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useTeam = () => {
  const dispatch = useDispatch();
  const { addMessage } = useNotifier();
  const { org } = useSelector(state => state.org);
  const { user } = useSelector(state => state.auth);
  const { team } = useSelector(state => state.team);

  const createTeam = async data => {
    dispatch(setTeamLoading(true));
    try {
      const res = await axios.post(`${backendUrl}/team/${org?._id}/createTeam`, data, {
        withCredentials: true,
      });
      if (res.data.data) {
        const newTeam = res.data.data;
        dispatch(
          setOrg({
            ...org,
            teams: [...org.teams, newTeam],
          })
        );
        dispatch(
          setUser({
            ...user,
            inTeams: [
              ...user.inTeams,
              {
                role: newTeam.members[0]?.role,
                team: {
                  _id: newTeam._id,
                  teamName: newTeam.teamName,
                  description: newTeam.description,
                },
                _id: newTeam._id,
              },
            ],
          })
        );
        addMessage('Team created successfully ! ', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTeamErrorMessage(error.response?.data?.message || 'failed to create Team !'));
      return false;
    } finally {
      dispatch(setTeamLoading(false));
    }
  };

  const UpdateTeam = async (data, teamId) => {
    dispatch(setTeamLoading(true));
    try {
      const res = await axios.put(
        `${backendUrl}/team/${org?._id}/updateTeam/${teamId}`,
        data, //teamName , description
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const updatedTeam = res.data.data;
        const updatedOrgTeams = org.teams.map(t => (t._id === updatedTeam._id ? updatedTeam : t));
        const updatedUserInTeams = user.inTeams.map(t =>
          t.team._id === updatedTeam._id
            ? {
                ...t,
                role: updatedTeam.members.find(m => m.member._id === user._id)?.role || t.role,
                team: {
                  _id: updatedTeam._id,
                  teamName: updatedTeam.teamName,
                  description: updatedTeam.description,
                },
              }
            : t
        );
        dispatch(
          setOrg({
            ...org,
            teams: updatedOrgTeams,
          })
        );
        dispatch(
          setUser({
            ...user,
            inTeam: updatedUserInTeams,
          })
        );
        dispatch(
          setTeam({
            ...team,
            teamName: updatedTeam.teamName,
            timeline: updatedTeam.timeline,
          })
        );
        addMessage('Team updated successfully ! ', 'success');
        return true;
      }
    } catch (error) {
      console.log(error);
      dispatch(setTeamErrorMessage(error.response?.data?.message || 'failed to updated Team !'));
      return false;
    } finally {
      dispatch(setTeamLoading(false));
    }
  };

  const deleteTeam = async (teamId, teamName) => {
    dispatch(setTeamLoading(true));
    try {
      const res = await axios.delete(`${backendUrl}/team/${org?._id}/deleteTeam/${teamId}`, {
        data: { teamName },
        withCredentials: true,
      });
      if (res.data) {
        const updatedOrgTeams = org.teams.filter(t => t._id !== teamId);
        const updatedUserInTeams = user.inTeams.filter(t => t.team._id !== teamId);
        dispatch(
          setOrg({
            ...org,
            teams: updatedOrgTeams,
          })
        );
        dispatch(
          setUser({
            ...user,
            inTeams: updatedUserInTeams,
          })
        );
        dispatch(setTeam(null));
        addMessage('Team deleted successfully ! ', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTeamErrorMessage(error.response?.data?.message || 'failed to del Team !'));
      return false;
    } finally {
      dispatch(setTeamLoading(false));
    }
  };

  const removeMemberFromTeam = async memberId => {
    dispatch(setMemberLoading(true));
    try {
      const res = await axios.delete(`${backendUrl}/team/${org?._id}/removeMemberFromTeam/${team?._id}/${memberId}`, {
        withCredentials: true,
      });
      if (res.data) {
        const newMembers = team?.members.filter(m => m.member._id !== memberId);
        const updatedOrgTeams = org.teams.map(t => {
          if (t._id === team._id) {
            return {
              ...t,
              members: t.members.filter(m => m.member._id !== memberId),
            };
          }
          return t;
        });
        dispatch(
          setTeam({
            ...team,
            members: newMembers,
          })
        );
        dispatch(
          setOrg({
            ...org,
            teams: updatedOrgTeams,
          })
        );
        addMessage('member removed successfully ! ', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setMemberErrorMessage(error.response?.data?.message || 'failed to remove member !'));
      return false;
    } finally {
      dispatch(setMemberLoading(false));
    }
  };

  const changeTeamMemberRole = async (data, memberId) => {
    dispatch(setMemberLoading(true));
    try {
      const res = await axios.patch(
        `${backendUrl}/team/${org?._id}/changeTeamMemberRole/${team?._id}/${memberId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const updatedMember = res.data.data;
        const newMembers = team?.members.map(m => (m._id === updatedMember._id ? updatedMember : m));
        dispatch(
          setTeam({
            ...team,
            members: newMembers,
          })
        );
        addMessage('Member role updated', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setMemberErrorMessage(error.response?.data?.message || 'failed to change Member Role !'));
      return false;
    } finally {
      dispatch(setMemberLoading(false));
    }
  };

  const transferOwnershipOfTeam = async memberId => {
    dispatch(setMemberLoading(true));
    try {
      const res = await axios.patch(
        `${backendUrl}/team/${org?._id}/transferOwnershipOfTeam/${team?._id}/${memberId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const updatedMember = res.data.data;
        dispatch(
          setTeam({
            ...team,
            members: updatedMember,
          })
        );
        addMessage('Ownership Transfer successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setMemberErrorMessage(error.response?.data?.message || 'failed to Transfer Ownership !'));
      return false;
    } finally {
      dispatch(setMemberLoading(false));
    }
  };

  const inviteMemberForTeam = async data => {
    dispatch(setTeamLoading(true));
    try {
      const res = await axios.post(`${backendUrl}/team/${org?._id}/inviteMemberForTeam/${team?._id}`, data, {
        withCredentials: true,
      });
      if (res) {
        addMessage('Invite sent successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTeamErrorMessage(error.response?.data?.message || 'failed to invite Member !'));
      addMessage(error.response?.data?.message, 'error' || 'failed to invite Member !', 'error');
      return false;
    } finally {
      dispatch(setTeamLoading(false));
    }
  };

  const acceptInviteForTeam = async inviteId => {
    dispatch(setInviteLoading(true));
    try {
      const res = await axios.patch(
        `${backendUrl}/team/acceptInviteForTeam/${inviteId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.data) {
        const { org: newOrg, team: newteam } = res.data.data;
        const teamObj = newteam?.team || newteam;
        const role = newteam?.role;
        const newInvites = user.invites.filter(i => i._id !== inviteId);
        const newInTeams = [...user.inTeams, { team: teamObj, role, _id: newteam._id }];
        const updatedUser = {
          ...user,
          invites: newInvites,
          inTeams: newInTeams,
        };
        const isUserInOrg = user.inOrg.some(o => o.org?._id === newOrg._id);
        if (!isUserInOrg) {
          updatedUser.inOrg = [...user.inOrg, newOrg];
        }
        dispatch(setUser(updatedUser));
        if (org?._id === newOrg._id) {
          const isAlreadyInOrgMembers = org.members.some(m => m.member._id === user._id);
          if (!isAlreadyInOrgMembers) {
            const userToAdd = {
              member: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                profilePhoto: user.profilePhoto,
              },
              role: newteam.members.find(m => m.member._id === user._id)?.role || 'member',
              _id: user._id,
              joinedAt: new Date().toISOString(),
            };
            dispatch(
              setOrg({
                ...org,
                members: [...org.members, userToAdd],
              })
            );
          }
        }
        addMessage('Invitation accepted successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setInviteErrorMessage(error.response?.data?.message || 'Failed to accept invitation!'));
      return false;
    } finally {
      dispatch(setInviteLoading(false));
    }
  };

  const declineInviteForTeam = async inviteId => {
    dispatch(setInviteLoading(true));
    try {
      const res = await axios.delete(`${backendUrl}/team/declineInviteForTeam/${inviteId}`, {
        withCredentials: true,
      });
      if (res) {
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
      dispatch(setInviteErrorMessage(error.response?.data?.message || 'failed to reject Invitation   !'));
      return false;
    } finally {
      dispatch(setInviteLoading(false));
    }
  };

  const leaveTeam = async teamId => {
    dispatch(setTeamLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/team/${org?._id}/leaveTeam/${teamId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        const userUpdatedInTeam = user.inTeams.filter(t => t._id !== teamId);
        dispatch(
          setUser({
            ...user,
            inTeams: userUpdatedInTeam,
          })
        );
        const updatedTeamMembers = team.members.filter(m => m.member._id !== user._id);
        dispatch(
          setTeam({
            ...team,
            members: updatedTeamMembers,
          })
        );
        addMessage('Team leaved successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTeamErrorMessage(error.response?.data?.message || 'failed to leave Team!'));
      return false;
    } finally {
      dispatch(setTeamLoading(false));
    }
  };

  return {
    createTeam,
    UpdateTeam,
    deleteTeam,
    removeMemberFromTeam,
    changeTeamMemberRole,
    transferOwnershipOfTeam,
    inviteMemberForTeam,
    acceptInviteForTeam,
    declineInviteForTeam,
    leaveTeam,
  };
};

export default useTeam;
