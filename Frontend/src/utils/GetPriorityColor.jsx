export const GetPriorityColor = priority => {
  const priorityColors = {
    High: 'text-yellow-500',
    Medium: 'text-blue-500',
    Low: 'text-green-500',
    'Very High': 'text-red-500',
  };

  return priorityColors[priority] || 'text-gray-500';
};
