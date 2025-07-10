const getAssignedTasksToTeam = (teamId, org) => {
  if (!org || !teamId) return [];

  const assignedTasks = [];

  org.projects?.forEach(project => {
    project.projectSections?.forEach(section => {
      section.tasks?.forEach(task => {
        const isAssigned = task.assignedToTeam?.some(t => t._id === teamId);
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

export default getAssignedTasksToTeam;
