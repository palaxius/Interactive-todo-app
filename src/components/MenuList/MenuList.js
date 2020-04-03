import React from "react";
import "./MenuList.scss";
import classNames from 'classnames'
import Badge from "../Badge/Badge";
import removeIcon from '../../assets/img/remove.svg'

const MenuList = ({ items, isRemovable, onClick, onRemove }) => {

  const removeFolder = (item) => {
    const confirm = window.confirm('Вы действительно хотите удалить эту папку?')

    if (confirm) {
      onRemove(item)
    }
  }

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
   
              { isRemovable && <img src={removeIcon} alt="close" onClick={() => removeFolder(item)}/>  }

            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuList;
