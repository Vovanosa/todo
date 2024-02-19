import React from "react";
import Checkbox from "./../ui-kit/checkbox";
import InputText from "./../ui-kit/inputText";
import Button from "./../ui-kit/button";
import DatePicker from "react-date-picker";
import { Task } from "../../interfaces/task";

interface TaskItemProps {
  task: Task;
  index: number;
  editingTask: Task | null;
  editedText: string;
  isDeadlineOpened: boolean;
  deadlineIndex: Number | undefined;
  toggleTaskStatus: (task: Task) => void;
  deleteTask: (task: Task) => void;
  changeTaskDeadline: (date: Date, task: Task) => void;
  setIsDeadlineOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setDeadlineIndex: React.Dispatch<React.SetStateAction<Number | undefined>>;
  editTask: (task: Task) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  finishEditing: React.KeyboardEventHandler<HTMLInputElement>;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
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
    <li key={index} className="task">
      <Checkbox
        isChecked={task.completed}
        onChange={() => toggleTaskStatus(task)}
      />
      <span
        onClick={() => toggleTaskStatus(task)}
        id={`task${task.completed}`}
      >
        {editingTask === task ? (
          <InputText
            autoFocus={true}
            inputText={"Введіть завдання"}
            id={"editTextInput"}
            value={editedText}
            onChange={handleInputChange}
            onKeyDown={finishEditing}
          />
        ) : (
          task.text
        )}
      </span>

      <Button
        buttonText={"Видалити"}
        handleClick={() => deleteTask(task)}
        disabled={false}
        id="deleteButton"
      />

      {isDeadlineOpened && index === deadlineIndex ? (
        <DatePicker
          minDate={new Date()}
          maxDate={new Date(2100, 0, 1)}
          format="dd-MM-yyyy"
          disableCalendar={true}
          onChange={(date) => {
            setIsDeadlineOpened(false);
            if (
              date !== null &&
              date instanceof Date &&
              date > new Date()
            )
              changeTaskDeadline(date, task);
          }}
        />
      ) : (
        <Button
          buttonText={task.deadline}
          handleClick={() => {
            setIsDeadlineOpened(true);
            setDeadlineIndex(index);
          }}
          disabled={false}
          id={""}
        />
      )}

      <Button
        buttonText={"Редагувати"}
        handleClick={() => {
          editTask(task);
        }}
        disabled={false}
        id={""}
      />
    </li>
  );
};

export default TaskItem;
