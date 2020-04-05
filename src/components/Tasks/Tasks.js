import React from "react";
import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";
import AddNewTask from "./AddNewTask/AddNewTask";

const Tasks = ({ list, onEdit, onAddTask }) => {
  const onEditTitle = () => {
    const newTitle = window.prompt(
      "Введите новое названия для папки",
      list.name
    );

    if (newTitle) {
      onEdit(list.id, newTitle);
    }
  };
  return (
    <div className="todo__tasks">
      <div className="tasks">
        <h2 className="tasks__title">
          {list.name}
          <img src={editSvg} alt="edit" onClick={onEditTitle} />
        </h2>

        <div className="tasks__items">
          {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
          {list.tasks.map((task) => {
            return (
              <div className="tasks__items-row" key={task.id}>
                <div className="checkbox">
                  <input id={`task-${task.id}`} type="checkbox" />
                  <label htmlFor={`task-${task.id}`}>
                    <svg
                      width="11"
                      height="8"
                      viewBox="0 0 11 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeinejoin="round"
                      />
                    </svg>
                  </label>
                </div>
                <input value={task.text} readOnly />
              </div>
            );
          })}
        </div>
        <AddNewTask list={list} onAddTask={onAddTask}/>
      </div>
    </div>
  );
};

export default Tasks;
