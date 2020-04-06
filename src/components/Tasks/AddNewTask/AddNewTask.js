import React from "react";
import "./AddNewTask.scss";
import plusSvg from "../../../assets/img/plus-task.svg";
import { useState } from "react";
import Axios from "axios";

const AddNewTask = ({ list, onAddTask }) => {
  const [openForm, setOpenForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  const toggleForm = () => {
    setOpenForm(!openForm);
    setInputValue("");
  };

  const addTask = () => {
    if (!inputValue) {
      alert("Введите название задачи!");
      return;
    }
    const newTask = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setLoading(true);
    Axios.post("http://localhost:3001/tasks", newTask)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleForm();
      })
      .catch(() => {
        alert("Ошибка при добавлении новой задачи!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {openForm ? (
        <div className="tasks__form-block">
          <input
            type="text"
            placeholder="Текст задачи"
            className="field"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            autoFocus
          />
          <button disabled={isLoading} className="btn" onClick={addTask}>
            {isLoading ? "Добавление..." : "Добавить задачу"}
          </button>
          <button className="btn btn--gray" onClick={() => setOpenForm(false)}>
            Отмена
          </button>
        </div>
      ) : (
        <div className="tasks__form-new" onClick={toggleForm}>
          <img src={plusSvg} alt="add new taks" />
          <span>Новая задача</span>
        </div>
      )}
    </div>
  );
};

export default AddNewTask;
