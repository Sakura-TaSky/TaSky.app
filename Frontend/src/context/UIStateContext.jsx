import { createContext, useContext, useState } from 'react';

const UIStateContext = createContext();

export const UIStateProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [membersShowInList, setMembersShowInList] = useState(false);
  const [taskShowInBoard, setTaskShowInBoard] = useState(false);
  const [showTaskPage, setShowTaskPage] = useState(false);
  const [showTaskComments, setShowTaskComments] = useState(false);
  const [showConformation, setShowConformation] = useState(false);

  const value = {
    isSidebarOpen,
    setIsSidebarOpen,

    membersShowInList,
    setMembersShowInList,

    taskShowInBoard,
    setTaskShowInBoard,

    showTaskPage,
    setShowTaskPage,

    showTaskComments,
    setShowTaskComments,

    showConformation,
    setShowConformation,
  };

  return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>;
};

export const useUIState = () => {
  return useContext(UIStateContext);
};
