import React from "react";
import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";
import AddNewTask from "./AddNewTask/AddNewTask";
import Task from "./Task";
import { Link } from "react-router-dom";

const Tasks = ({
  list,
  onEdit,
  onAddTask,
  withoutTasks,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) => {
  const onEditTitle = () => {
    const newTitle = window.prompt(
      "Введите новое названия для списка",
      list.name
    );

    if (newTitle) {
      onEdit(list.id, newTitle);
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img src={editSvg} alt="edit" onClick={onEditTitle} />
        </h2>
      </Link>
      <div className="tasks__items">
        {!withoutTasks && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => {
            return (
              <Task
                task={task}
                key={task.id}
                list={list}
                onRemove={onRemoveTask}
                onEdit={onEditTask}
                onComplete={onCompleteTask}
              />
            );
          })}
      </div>
      <AddNewTask key={list.id} list={list} onAddTask={onAddTask} />
    </div>
  );
};

export default Tasks;
