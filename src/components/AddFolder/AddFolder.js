import React, { useState } from "react";
import MenuList from "../MenuList/MenuList";
import "./AddFolder.scss";
import Badge from "../Badge/Badge";
import x from "../../assets/img/x.svg";
import { useEffect } from "react";
import Axios from "axios";

const AddFolder = ({ colors, onAddList }) => {
  const [popup, setPopup] = useState(false);
  const [selectColor, setSelectColor] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectColor(colors[0].id);
    }
  }, [colors]);

  const item = [
    {
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 1V11"
            stroke="#868686"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 6H11"
            stroke="#868686"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      name: "Добавить папку",
      className: "list-btn",
    },
  ];

  const onClose = () => {
    setPopup(false);
    setInputValue("");
    setSelectColor(colors[0].id);
  };

  const addListHandler = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }

    setLoading(true);

    Axios.post("http://localhost:3001/lists", {
      name: inputValue,
      colorId: selectColor,
    })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectColor)[0];
        const listObj = {
          ...data,
          color,
          tasks: []
        };
        onAddList(listObj);
        onClose();
      })
      .catch(() => {
        alert("Ошибка при добавлении нового списка!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <MenuList items={item} onClick={() => setPopup(!popup)} />
      {popup && (
        <div className="add-list__popup">
          <img
            src={x}
            alt="close button"
            className="add-list__popup-close-btn"
            onClick={onClose}
          />

          <input
            type="text"
            placeholder="Название папки"
            className="field"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />

          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectColor(color.id)}
                color={color.name}
                key={color.id}
                className={selectColor === color.id && "active"}
              />
            ))}
          </div>
          <button className="btn" onClick={addListHandler}>
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </>
  );
};

export default AddFolder;
