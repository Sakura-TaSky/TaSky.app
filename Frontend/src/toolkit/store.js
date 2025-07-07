import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import orgSlice from './slice/orgSlice';
import teamSlice from './slice/teamSlice';
import projectSlice from './slice/projectSlice';
import sectionSlice from './slice/p-sectionSlice';
import taskSlice from './slice/taskSlice';
import memberSlice from './slice/memberSlice';
import inviteSlice from './slice/inviteSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    org: orgSlice,
    team: teamSlice,
    project: projectSlice,
    section: sectionSlice,
    task: taskSlice,
    member: memberSlice,
    invite: inviteSlice,
  },
});

export default store;
