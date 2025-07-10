import React, { useState } from 'react';
import { IconBtn, TaskForm } from '@/global';
import { Plus } from 'lucide-react';

const AddTaskBtn = () => {
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);

  return (
    <>
      <IconBtn
        text='Add Task'
        icon={<Plus size={16} />}
        onClick={() => setShowAddTaskPopup(true)}
        className='px-3 py-2 text-sm flex items-center gap-2 rounded bg-blue-500 text-white hover:bg-blue-700 shadow-md fixed bottom-5 right-5 z-80'
      />
      {showAddTaskPopup && <TaskForm setShowAddTaskPopup={setShowAddTaskPopup} />}
    </>
  );
};

export default AddTaskBtn;
