import { setOrg, setProject, setSection, setTask, setTaskErrorMessage, setTaskLoading, useNotifier } from '@/global';
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

  const createTask = async (data, projectId, sectionId) => {
    dispatch(setTaskLoading(true));
    try {
      const res = await axios.post(`${backendUrl}/task/${org._id}/${projectId}/${sectionId}/createTask`, data, {
        withCredentials: true,
      });
      if (res.data.data) {
        const newTask = res.data.data;
        dispatch(
          setSection({
            ...section,
            tasks: [...section.tasks, newTask],
          })
        );
        const updatedProject = project.projectSections.map(s => {
          if (s._id == sectionId) {
            return {
              ...s,
              tasks: [...s.tasks, newTask],
            };
          }
          return s;
        });
        dispatch(
          setProject({
            ...project,
            projectSections: updatedProject,
          })
        );
        const updatedOrg = org.projects.map(p => {
          if (p._id == projectId) {
            p.projectSections.map(s => {
              if (s._id == sectionId) {
                return {
                  ...s,
                  tasks: [...s.tasks, newTask],
                };
              }
              return s;
            });
          }
          return p;
        });
        dispatch(
          setOrg({
            ...org,
            projects: updatedOrg,
          })
        );
        addMessage('Task created successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to create Task !'));
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const deleteTask = async taskId => {
    dispatch(setTaskLoading(true));
    try {
      const res = await axios.delete(
        `${backendUrl}/task/${org._id}/${project._id}/${section._id}/deleteTask/${taskId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        dispatch(
          setSection({
            ...section,
            tasks: section.tasks.filter(t => t._id !== taskId),
          })
        );
        const updatedProjectSection = project.projectSections.map(s => {
          if (s._id == section._id) {
            return {
              ...s,
              tasks: s.tasks.filter(t => t._id !== taskId),
            };
          }
          return s;
        });
        dispatch(setProject({ ...project, projectSections: updatedProjectSection }));
        const updatedProjectInOrg = org.projects.map(p => {
          if (p._id == project._id) {
            return {
              ...p,
              projectSections: p.projectSections.map(s => {
                if (s._id == section._id) {
                  return {
                    ...s,
                    tasks: s.tasks.filter(t => t._id !== taskId),
                  };
                }
                return s;
              }),
            };
          }
          return p;
        });
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        dispatch(setTask(null));
        addMessage('Task deleted successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to delete Task !'));
      addMessage(error.response?.data?.message || 'failed to delete Task !', 'error');
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const updateTask = async (taskId, data) => {
    dispatch(setTaskLoading(true));
    try {
      const res = await axios.put(
        `${backendUrl}/task/${org._id}/${project._id}/${section._id}/updateTask/${taskId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        const updatedTask = res.data.data;
        dispatch(
          setSection({
            ...section,
            tasks: section.tasks.map(t => (t._id === taskId ? updatedTask : t)),
          })
        );
        const updatedProjectSection = project.projectSections.map(s =>
          s._id === section._id ? { ...s, tasks: s.tasks.map(t => (t._id === taskId ? updatedTask : t)) } : s
        );
        dispatch(setProject({ ...project, projectSections: updatedProjectSection }));
        const updatedProjectInOrg = org.projects.map(p =>
          p._id === project._id ? { ...p, projectSections: updatedProjectSection } : p
        );
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        dispatch(setTask(res.data.data));
        addMessage('Task updated successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to update Task !'));
      addMessage(error.response?.data?.message || 'failed to update Task !', 'error');
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const addSubTask = async (taskId, data) => {
    dispatch(setTaskLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/task/${org._id}/${project._id}/${section._id}/addSubTask/${taskId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const newSubTask = res.data.data;
        dispatch(setTask({ ...task, subTasks: [...task.subTasks, newSubTask] }));
        const updatedSection = {
          ...section,
          tasks: section.tasks.map(t => (t._id === taskId ? { ...t, subTasks: [...t.subTasks, newSubTask] } : t)),
        };
        const updatedProjectSection = project.projectSections.map(s => {
          if (s._id === section._id) {
            return {
              ...s,
              tasks: s.tasks.map(t => (t._id === taskId ? { ...t, subTasks: [...t.subTasks, newSubTask] } : t)),
            };
          }
          return s;
        });
        dispatch(setProject({ ...project, projectSections: updatedProjectSection }));
        dispatch(setSection(updatedSection));
        const updatedProjectInOrg = org.projects.map(p => {
          if (p._id === project._id) {
            return { ...p, projectSections: updatedProjectSection };
          }
          return p;
        });
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        addMessage('SubTask added successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to add SubTask !'));
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const deleteSubTask = async (taskId, subTaskId) => {
    dispatch(setTaskLoading(true));
    try {
      const res = await axios.delete(
        `${backendUrl}/task/${org._id}/${project._id}/${section._id}/deleteSubTask/${taskId}/${subTaskId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        dispatch(setTask({ ...task, subTasks: task.subTasks.filter(t => t._id !== subTaskId) }));
        const updatedSection = {
          ...section,
          tasks: section.tasks.map(t =>
            t._id === taskId ? { ...t, subTasks: t.subTasks.filter(st => st._id !== subTaskId) } : t
          ),
        };
        dispatch(setSection(updatedSection));
        const updatedProjectSection = project.projectSections.map(s => {
          if (s._id === section._id) {
            return {
              ...s,
              tasks: s.tasks.map(t =>
                t._id === taskId ? { ...t, subTasks: t.subTasks.filter(st => st._id !== subTaskId) } : t
              ),
            };
          }
          return s;
        });
        dispatch(setProject({ ...project, projectSections: updatedProjectSection }));
        const updatedProjectInOrg = org.projects.map(p => {
          if (p._id === project._id) {
            return { ...p, projectSections: updatedProjectSection };
          }
          return p;
        });
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        addMessage('SubTask deleted successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to delete SubTask !'));
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const updateSubTask = async (taskId, subTaskId, isCompleted) => {
    dispatch(setTaskLoading(true));
    try {
      const res = await axios.put(
        `${backendUrl}/task/${org._id}/${project._id}/${section._id}/updateSubTask/${taskId}/${subTaskId}`,
        {
          isCompleted,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const updatedSubTask = res.data.data;
        dispatch(setTask({ ...task, subTasks: task.subTasks.map(t => (t._id === subTaskId ? updatedSubTask : t)) }));
        const updatedSection = {
          ...section,
          tasks: section.tasks.map(t =>
            t._id === taskId
              ? { ...t, subTasks: t.subTasks.map(st => (st._id === subTaskId ? updatedSubTask : st)) }
              : t
          ),
        };
        dispatch(setSection(updatedSection));
        const updatedProjectSection = project.projectSections.map(s => {
          if (s._id === section._id) {
            return {
              ...s,
              tasks: s.tasks.map(t =>
                t._id === taskId
                  ? { ...t, subTasks: t.subTasks.map(st => (st._id === subTaskId ? updatedSubTask : st)) }
                  : t
              ),
            };
          }
          return s;
        });
        dispatch(setProject({ ...project, projectSections: updatedProjectSection }));
        const updatedProjectInOrg = org.projects.map(p => {
          if (p._id === project._id) {
            return { ...p, projectSections: updatedProjectSection };
          }
          return p;
        });
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        addMessage('SubTask updated successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to update SubTask !'));
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const addLink = async (taskId, data) => {
    dispatch(setTaskLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/task/${org._id}/${project._id}/${section._id}/addLink/${taskId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const newLink = res.data.data;
        dispatch(setTask({ ...task, links: [...task.links, newLink] }));
        const updatedSection = {
          ...section,
          tasks: section.tasks.map(t => (t._id === taskId ? { ...t, links: [...t.links, newLink] } : t)),
        };
        dispatch(setSection(updatedSection));
        const updatedProjectSection = project.projectSections.map(s => {
          if (s._id === section._id) {
            return { ...s, tasks: s.tasks.map(t => (t._id === taskId ? { ...t, links: [...t.links, newLink] } : t)) };
          }
          return s;
        });
        dispatch(setProject({ ...project, projectSections: updatedProjectSection }));
        const updatedProjectInOrg = org.projects.map(p => {
          if (p._id === project._id) {
            return { ...p, projectSections: updatedProjectSection };
          }
          return p;
        });
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        addMessage('Link added successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to add Link !'));
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const deleteLink = async (taskId, linkId) => {
    dispatch(setTaskLoading(true));
    console.log(taskId, linkId);
    try {
      const res = await axios.delete(`${backendUrl}/task/deleteLink/${taskId}/${linkId}`, {
        withCredentials: true,
      });
      if (res.data.data) {
        dispatch(setTask({ ...task, links: task.links.filter(l => l._id !== linkId) }));
        const updatedSection = {
          ...section,
          tasks: section.tasks.map(t =>
            t._id === taskId ? { ...t, links: t.links.filter(l => l._id !== linkId) } : t
          ),
        };
        console.log('1');
        dispatch(setSection(updatedSection));
        const updatedProjectSection = project.projectSections.map(s => {
          if (s._id === section._id) {
            return {
              ...s,
              tasks: s.tasks.map(t => (t._id === taskId ? { ...t, links: t.links.filter(l => l._id !== linkId) } : t)),
            };
          }
          return s;
        });
        console.log('2');
        dispatch(setProject({ ...project, projectSections: updatedProjectSection }));
        const updatedProjectInOrg = org.projects.map(p => {
          if (p._id === project._id) {
            return { ...p, projectSections: updatedProjectSection };
          }
          return p;
        });
        console.log('3');
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        addMessage('Link deleted successfully', 'success');
        return true;
      }
    } catch (error) {
      console.log(error);
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to delete Link !'));
      addMessage(error.response?.data?.message || 'failed to delete Link !', 'error');
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const addAttachment = async (taskId, file) => {
    dispatch(setTaskLoading(true));
    try {
      const formData = new FormData();
      if (file) {
        formData.append('attachments', file);
      }
      const res = await axios.post(
        `${backendUrl}/task/${org._id}/${project._id}/${section._id}/addAttachment/${taskId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (res.data.data) {
        const newAttachment = res.data.data;
        dispatch(setTask({ ...task, attachments: [...task.attachments, newAttachment] }));
        const updatedSection = {
          ...section,
          tasks: section.tasks.map(t =>
            t._id === taskId ? { ...t, attachments: [...t.attachments, newAttachment] } : t
          ),
        };
        dispatch(setSection(updatedSection));
        const updatedProjectSection = project.projectSections.map(s => {
          if (s._id === section._id) {
            return {
              ...s,
              tasks: s.tasks.map(t =>
                t._id === taskId ? { ...t, attachments: [...t.attachments, newAttachment] } : t
              ),
            };
          }
          return s;
        });
        dispatch(setProject({ ...project, projectSections: updatedProjectSection }));
        const updatedProjectInOrg = org.projects.map(p => {
          if (p._id === project._id) {
            return { ...p, projectSections: updatedProjectSection };
          }
          return p;
        });
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        addMessage('Attachment added successfully', 'success');
        return true;
      }
    } catch (error) {
      console.log(error);
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to add Attachment !'));
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const deleteAttachment = async (taskId, attachmentId) => {
    dispatch(setTaskLoading(true));
    try {
      const res = await axios.delete(`${backendUrl}/task/deleteAttachment/${taskId}/${attachmentId}`, {
        withCredentials: true,
      });
      if (res.data) {
        dispatch(setTask({ ...task, attachments: task.attachments.filter(a => a._id !== attachmentId) }));
        const updatedSection = {
          ...section,
          tasks: section.tasks.map(t =>
            t._id === taskId ? { ...t, attachments: t.attachments.filter(a => a._id !== attachmentId) } : t
          ),
        };
        dispatch(setSection(updatedSection));
        const updatedProjectSection = project.projectSections.map(s => {
          if (s._id === section._id) {
            return {
              ...s,
              tasks: s.tasks.map(t =>
                t._id === taskId ? { ...t, attachments: t.attachments.filter(a => a._id !== attachmentId) } : t
              ),
            };
          }
          return s;
        });
        const updatedProjectInOrg = org.projects.map(p => {
          if (p._id === project._id) {
            return { ...p, projectSections: updatedProjectSection };
          }
          return p;
        });
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        addMessage('Attachment deleted successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to delete Attachment !'));
      addMessage(error.response?.data?.message || 'failed to delete Attachment !', 'error');
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const addComment = async (taskId, data) => {
    dispatch(setTaskLoading(true));
    try {
      const res = await axios.post(
        `${backendUrl}/task/${org._id}/${project._id}/${section._id}/addComment/${taskId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data.data) {
        const allComments = res.data.data;
        dispatch(setTask({ ...task, comments: allComments }));
        const updatedSection = {
          ...section,
          tasks: section.tasks.map(t => (t._id === taskId ? { ...t, comments: allComments } : t)),
        };
        dispatch(setSection(updatedSection));
        const updatedProjectSection = project.projectSections.map(s => {
          if (s._id === section._id) {
            return {
              ...s,
              tasks: s.tasks.map(t => (t._id === taskId ? { ...t, comments: allComments } : t)),
            };
          }
          return s;
        });
        dispatch(setProject({ ...project, projectSections: updatedProjectSection }));
        const updatedProjectInOrg = org.projects.map(p => {
          if (p._id === project._id) {
            return { ...p, projectSections: updatedProjectSection };
          }
          return p;
        });
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        addMessage('Comment added successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to add Comment !'));
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };

  const deleteComment = async (taskId, commentId) => {
    dispatch(setTaskLoading(true));
    try {
      const res = await axios.delete(`${backendUrl}/task/deleteComment/${taskId}/${commentId}`, {
        withCredentials: true,
      });
      if (res.data) {
        const filteredComments = task.comments.filter(c => c._id !== commentId);
        dispatch(setTask({ ...task, comments: filteredComments }));
        const updatedSection = {
          ...section,
          tasks: section.tasks.map(t => (t._id === taskId ? { ...t, comments: filteredComments } : t)),
        };
        dispatch(setSection(updatedSection));
        const updatedProjectSection = project.projectSections.map(s => {
          if (s._id === section._id) {
            return {
              ...s,
              tasks: s.tasks.map(t => (t._id === taskId ? { ...t, comments: filteredComments } : t)),
            };
          }
          return s;
        });
        dispatch(setProject({ ...project, projectSections: updatedProjectSection }));
        const updatedProjectInOrg = org.projects.map(p => {
          if (p._id === project._id) {
            return { ...p, projectSections: updatedProjectSection };
          }
          return p;
        });
        dispatch(setOrg({ ...org, projects: updatedProjectInOrg }));
        addMessage('Comment deleted successfully', 'success');
        return true;
      }
    } catch (error) {
      dispatch(setTaskErrorMessage(error.response?.data?.message || 'failed to delete Comment !'));
      return false;
    } finally {
      dispatch(setTaskLoading(false));
    }
  };
  return {
    createTask,
    deleteTask,
    updateTask,
    addSubTask,
    deleteSubTask,
    updateSubTask,
    addLink,
    addAttachment,
    deleteAttachment,
    deleteLink,
    addComment,
    deleteComment,
  };
};

export default useTask;
