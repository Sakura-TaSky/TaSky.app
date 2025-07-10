// auth
import Auth from '../auth/Auth';
export { Auth };

// components
//ui
//Buttons
import { BlueBtn, Btn, FlatIcon, IconBtn, InfoIcon } from '../components';
export { BlueBtn, Btn, IconBtn, FlatIcon, InfoIcon };
//Inputs
import { Input, FileInput, TextArea } from '../components';
export { Input, FileInput, TextArea };
//Loader
import { Loader, DotLoader, AppLoader } from '../components';
export { Loader, DotLoader, AppLoader };
//Logo
import { Logo } from '../components';
export { Logo };
//view
//conform
import { Conform } from '../components';
export { Conform };
//membersList
import { AvatarGroup } from '../components';
export { AvatarGroup };
//org
import { MemberProfilePopup } from '../components';
export { MemberProfilePopup };
//profile
import { ProfilePopup, UpdateUser } from '../components';
export { ProfilePopup, UpdateUser };
//project
import { ProjectSection } from '@/components';
import { Task } from '../components';
import { ProjectTeam } from '../components';
import { AddTaskBtn } from '../components';
export { ProjectSection, Task, ProjectTeam, AddTaskBtn };
//sidebar
import { OrgSelect, ProfileIcon, TeamMenu, ProjectMenu } from '../components';
export { OrgSelect, ProfileIcon, TeamMenu, ProjectMenu };
//task
import { Comments } from '../components';
export { Comments };
//team
import { TeamTimeline } from '../components';
export { TeamTimeline };
//TopBar
import { OrgTimeline } from '../components';
export { OrgTimeline };

// context
//Notifier
import { NotifierProvider, useNotifier } from '../context/Notifier/context/NotifierContext';
import NotifierList from '../context/Notifier/NotifierList';

export { NotifierProvider, useNotifier, NotifierList };
import { UIStateProvider } from '../context/UIStateContext';
import { useUIState } from '../context/UIStateContext';
import { useOrgId } from '../context/OrgIdContext';
export { UIStateProvider, useUIState, useOrgId };

//Forms
//org
import OrgAddMember from '@/Forms/org/Org-AddMember';
import OrgUpdate from '@/Forms/org/Org-Update';
export { OrgAddMember, OrgUpdate };
//p-section
import AddUpdatePSection from '@/Forms/p-section/AddUpdatePSection';
export { AddUpdatePSection };
//project
import ProjectUpdate from '@/Forms/project/Project-Update';
import ProjectAddMember from '@/Forms/project/Project-AddMember';
import ProjectAddTeam from '@/Forms/project/Project-AddTeam';
export { ProjectUpdate, ProjectAddMember, ProjectAddTeam };
//task
import TaskForm from '@/Forms/Task/TaskForm';
export { TaskForm };
//team
import TeamUpdate from '@/Forms/team/Team-Update';
import TeamAddMember from '@/Forms/team/Team-AddMember';
export { TeamUpdate, TeamAddMember };

// hooks
import {
  useTask,
  useSection,
  useProject,
  useTeam,
  useOrg,
  useLogin,
  useGetUser,
  useLogout,
  useVerifyOtp,
  useResendOtp,
  useSingUp,
  useGetResetPassOtp,
  useResetPassword,
  useUpadteUser,
  getAssignedTasks,
  getAssignedTasksToTeam,
} from '../hooks';
export {
  useLogin,
  useGetUser,
  useLogout,
  useVerifyOtp,
  useResendOtp,
  useSingUp,
  useGetResetPassOtp,
  useResetPassword,
  useUpadteUser,
  useOrg,
  useTeam,
  useProject,
  useSection,
  useTask,
  getAssignedTasks,
  getAssignedTasksToTeam,
};

// layouts
import AuthLayout from '../layouts/AuthLayout';
import AppLayout from '../layouts/AppLayout';
export { AuthLayout, AppLayout };

// styles
//Themes
import { ThemeProvider } from '../styles/Themes/Theme';
import { useTheme } from '../styles/Themes/Theme';
export { ThemeProvider, useTheme };

// toolkit
//Slice
//authSlice
import {
  setUser,
  setAuthLoading,
  logoutUser,
  setErrorMessage,
  setResMessage,
  setAppLoading,
  updateUserProfile,
} from '../toolkit/slice/authSlice';
export { setUser, setAuthLoading, logoutUser, setErrorMessage, setResMessage, setAppLoading, updateUserProfile };
//inviteSlice
import { setInvite, setInviteLoading, setInviteErrorMessage } from '../toolkit/slice/inviteSlice';
export { setInvite, setInviteErrorMessage, setInviteLoading };
//memberSlice
import { setMember, setMemberLoading, setMemberErrorMessage } from '../toolkit/slice/memberSlice';
export { setMember, setMemberLoading, setMemberErrorMessage };
//orgSlice
import { setOrg, setOrgLoading, setOrgErrorMessage, setOrgResMessage } from '../toolkit/slice/orgSlice';
export { setOrg, setOrgLoading, setOrgErrorMessage, setOrgResMessage };
//p-sectionSlice
import {
  setSection,
  setSectionErrorMessage,
  setSectionLoading,
  setSectionResMessage,
} from '@/toolkit/slice/p-sectionSlice';
export { setSection, setSectionErrorMessage, setSectionLoading, setSectionResMessage };
//projectSlice
import {
  setProject,
  setProjectErrorMessage,
  setProjectLoading,
  setProjectResMessage,
} from '@/toolkit/slice/projectSlice';
export { setProject, setProjectErrorMessage, setProjectLoading, setProjectResMessage };
//taskSlice
import { setTask, setTaskErrorMessage, setTaskLoading, setTaskResMessage } from '@/toolkit/slice//taskSlice';
export { setTask, setTaskErrorMessage, setTaskLoading, setTaskResMessage };
//teamSlice
import { setTeam, setTeamErrorMessage, setTeamLoading, setTeamResMessage } from '@/toolkit/slice/teamSlice';
export { setTeam, setTeamErrorMessage, setTeamLoading, setTeamResMessage };
import store from '../toolkit/store';
export { store };

// utils
import { useHotkey } from '../utils/ShortCuts';
import { useClickOutside } from '../utils/ClickOutSied';
import { GetRoleColor } from '../utils/GetRoleColor';
import { formatDate } from '../utils/formatDate';
import { GetPriorityColor } from '@/utils/GetPriorityColor';
export { useHotkey, useClickOutside, GetRoleColor, formatDate, GetPriorityColor };

// views
//auth-page
import SingUp from '../views/auth/SingUp';
import Login from '../views/auth/Login';
import Otp from '../views/auth/Otp';
import GetResetOtp from '../views/auth/GetResetOtp';
import ResetPass from '../views/auth/ResetPass';
export { SingUp, Login, Otp, GetResetOtp, ResetPass };
//navigation
import SideBar from '../views/navigation/SideBar';
import TopBar from '../views/navigation/TopBar';
export { SideBar, TopBar };
//pages
import ProfilePage from '../views/pages/ProfilePage';
import OrgMemberPage from '@/views/pages/OrgMemberPage';
import TeamMemberPage from '@/views/pages/TeamMemberPage';
import ProjectPage from '@/views/pages/ProjectPage';
import OrgPage from '@/views/pages/OrgPage';
import Invite from '@/views/pages/Invite';
import AcceptInvite from '@/views/pages/acceptInvite';
import ProjectMemberPage from '@/views/pages/ProjectMemberPage';
import TeamAssignedTask from '@/views/pages/TeamAssignedTask';
export {
  ProfilePage,
  OrgMemberPage,
  TeamMemberPage,
  ProjectPage,
  OrgPage,
  Invite,
  AcceptInvite,
  ProjectMemberPage,
  TeamAssignedTask,
};

// temp
import ThemeToggle from '../temp/ThemeToggle';
import { fromHalfFloat } from 'three/src/extras/DataUtils';
export { ThemeToggle };
