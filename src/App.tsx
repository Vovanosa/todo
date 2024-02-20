import React, { useState, useEffect, FunctionComponent } from "react";
import "./App.css";
import TaskList from "./components/taskList";
import { Task } from "./interfaces/task";
import InputPole from "./components/inputPole";
import Modal from "react-modal";
import axios from "axios";
import Selector from "./components/ui-kit/selector/inputText/Selector";

Modal.setAppElement("#root");

const App: FunctionComponent = () => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editedText, setEditedText] = useState("");
  const [isDeadlineOpened, setIsDeadlineOpened] = useState(false);
  const [deadlineIndex, setDeadlineIndex] = useState<Number>();
  const [isDeadlineChecked, setIsDeadlineChecked] = useState(false);
  const [deadlineNewTask, setDeadlineNewTask] = useState("Додати дедлайн");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDetail, setSelectedDetail] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [detailedOptions, setDetailedOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://ergast.com/api/f1/2024.json");
      const data = response.data.MRData.RaceTable.Races[0];
      const types = [1, 3, 5].map((index) => Object.keys(data)[index]);
      setOptions(types);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await axios.get(`https://ergast.com/api/f1/2024.json`);
      const data = response.data.MRData.RaceTable.Races;
      const selectedOptions = data.map(
        (item: typeof data) => item[selectedType]
      );
      setDetailedOptions(
        Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions]
      );
    };

    if (selectedType) {
      fetchOptions();
    }
  }, [selectedType]);

  const handleAddTaskButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTaskInput("");
    setSelectedType("");
    setDeadlineNewTask("Додати дедлайн");
  };

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!(event.target.value === " " && event.target.value.length === 1)) {
      if (editingTask) {
        setEditedText(event.target.value);
      } else setTaskInput(event.target.value);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const createTask = (
    taskText: string,
    isCompleted: boolean,
    deadline: string
  ) => {
    const newTask: Task = {
      text: taskText,
      completed: isCompleted,
      deadline: deadline,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const addTask = () => {
    const trimmedText = taskInput.trim();
    if (trimmedText !== "") {
      createTask(
        trimmedText + " " + selectedType + " " + selectedDetail,
        false,
        deadlineNewTask
      );
      setDeadlineNewTask("Додати дедлайн");
      setTaskInput("");
      handleModalClose();
    }
    saveTasksToLocalStorage();
  };

  const toggleTaskStatus = (task: Task) => {
    task.completed = !task.completed;
    setTasks([...tasks]);
    saveTasksToLocalStorage();
  };

  const deleteTask = (task: Task) => {
    const updatedTasks = tasks.filter((t) => t !== task);
    setTasks(updatedTasks);
    saveTasksToLocalStorage();
  };

  const changeTaskDeadline = (date: Date, task: Task) => {
    task.deadline = date.toDateString();
    setTasks([...tasks]);
    saveTasksToLocalStorage();
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setEditedText(task.text);
  };

  const finishEditing: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && editedText.trim() !== "") {
      if (editingTask) {
        editingTask.text = editedText.trim();
        setEditingTask(null);
        editingTask.completed = false;
      }
    }
  };

  const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
    const tasksJSON = localStorage.getItem("tasks");

    if (tasksJSON) {
      const loadedTasks: Task[] = JSON.parse(tasksJSON);
      setTasks(loadedTasks);
    }
  };

  window.addEventListener("beforeunload", saveTasksToLocalStorage);

  return (
    <>
      <header>
        <h1>Список справ</h1>
      </header>
      <button onClick={handleAddTaskButtonClick}>Додати завдання</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Додати завдання"
        className="modal">

        <Selector
          defaultOption={"Select data type"}
          options={options}
          setSelectedValue={setSelectedType}
        />
        {selectedType && (
          <Selector
            defaultOption={"Select exact data"}
            options={detailedOptions}
            setSelectedValue={setSelectedDetail}
          />
        )}
        <InputPole
          taskInput={taskInput}
          isDeadlineChecked={isDeadlineChecked}
          deadlineNewTask={deadlineNewTask}
          setIsDeadlineChecked={setIsDeadlineChecked}
          setDeadlineNewTask={setDeadlineNewTask}
          handleInputChange={handleInputChange}
          handleInputKeyDown={handleInputKeyDown}
          addTask={addTask}
        />
        <button onClick={handleModalClose}>Закрити</button>
      </Modal>

      <TaskList
        tasks={tasks}
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
    </>
  );
};

export default App;
