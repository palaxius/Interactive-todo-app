import React from "react";
import "./MenuList.scss";

const MenuList = ({ items }) => {
  return (
    <div>
      <ul className="Menulist">
        {items.map((item, index) => {
          return (
            <li key={index} className={ item.active ? 'active' : null }>
              {item.icon ? (
                <i>{item.icon}</i>
              ) : (
                <i className={`badge badge--${item.color}`}></i>
              )}
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuList;
