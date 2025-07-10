const getAssignedTasks = (user, org) => {
  if (!org || !user) return [];

  const assignedTasks = [];

  org.projects?.forEach(project => {
    project.projectSections?.forEach(section => {
      section.tasks?.forEach(task => {
        const isAssigned = task.assignedToMember?.some(m => m._id === user._id);
        if (isAssigned) {
          assignedTasks.push({
            task,
            section,
            project,
            org,
          });
        }
      });
    });
  });

  return assignedTasks;
};

export default getAssignedTasks;
