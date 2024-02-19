import React from "react";
import TaskItem from "./../taskItem";
import { Task } from "../../interfaces/task";

interface TaskListProps {
  tasks: Task[];
  editingTask: Task | null;
  editedText: string;
  isDeadlineOpened: boolean;
  deadlineIndex?: Number;
  toggleTaskStatus: (task: Task) => void;
  deleteTask: (task: Task) => void;
  changeTaskDeadline: (date: Date, task: Task) => void;
  setIsDeadlineOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setDeadlineIndex: React.Dispatch<React.SetStateAction<Number | undefined>>;
  editTask: (task: Task) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  finishEditing: React.KeyboardEventHandler<HTMLInputElement>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  editingTask,
  editedText,
  isDeadlineOpened,
  deadlineIndex,
  toggleTaskStatus,
  deleteTask,
  changeTaskDeadline,
  setIsDeadlineOpened,
  setDeadlineIndex,
  editTask,
  handleInputChange,
  finishEditing,
}) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          editingTask={editingTask}
          editedText={editedText}
          isDeadlineOpened={isDeadlineOpened}
          deadlineIndex={deadlineIndex}
          toggleTaskStatus={toggleTaskStatus}
          deleteTask={deleteTask}
          changeTaskDeadline={changeTaskDeadline}
          setIsDeadlineOpened={setIsDeadlineOpened}
          setDeadlineIndex={setDeadlineIndex}
          editTask={editTask}
          handleInputChange={handleInputChange}
          finishEditing={finishEditing}
        />
      ))}
    </ul>
  );
};

export default TaskList;