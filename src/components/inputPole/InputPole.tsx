import React from "react";
import InputText from "./../ui-kit/inputText"; 
import Checkbox from "./../ui-kit/checkbox"; 
import DatePicker from "react-date-picker";
import Button from "./../ui-kit/button";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

interface InputPoleProps {
  taskInput: string;
  isDeadlineChecked: boolean;
  deadlineNewTask: string;
  setIsDeadlineChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setDeadlineNewTask: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  addTask: () => void;
}

const InputPole: React.FC<InputPoleProps> = ({
  taskInput,
  isDeadlineChecked,
  deadlineNewTask,
  setIsDeadlineChecked,
  setDeadlineNewTask,
  handleInputChange,
  handleInputKeyDown,
  addTask,
}) => {
  return (
    <section className="inputpole">
      <InputText
        autoFocus={false}
        inputText={"Введіть завдання"}
        id={"taskInput"}
        value={taskInput}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />

      {!isDeadlineChecked ? (
        <Checkbox
          isChecked={isDeadlineChecked}
          onChange={() => setIsDeadlineChecked(!isDeadlineChecked)}
        >
          {deadlineNewTask}
        </Checkbox>
      ) : (
        <DatePicker
          minDate={new Date()}
          maxDate={new Date(2100, 0, 1)}
          format="dd-MM-yyyy"
          disableCalendar={true}
          onChange={(date) => {
            if (date !== null && date instanceof Date && date > new Date()) {
              setDeadlineNewTask(date.toDateString());
            }
            setIsDeadlineChecked(false);
          }}
        />
      )}

      <Button
        buttonText={"Додати"}
        handleClick={addTask}
        disabled={!taskInput.trim()}
      />
    </section>
  );
};

export default InputPole;