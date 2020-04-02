import React from "react";
import "./MenuList.scss";
import classNames from 'classnames'
import Badge from "../Badge/Badge";

const MenuList = ({ items, isRemovable, onClick }) => {
  return (
    <div>
      <ul className="MenuList ">
        {items.map((item, index) => {
          return (
            <li 
              key={index} 
              className={classNames(item.className, {'active' : item.active})}
              onClick={onClick}
              >
              {item.icon ? (
                <i>{item.icon}</i>
              ) : (
                <Badge color={item.color}/>
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
