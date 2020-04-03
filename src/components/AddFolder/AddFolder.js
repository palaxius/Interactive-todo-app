import React, { useState } from 'react';
import MenuList from '../MenuList/MenuList';
import './AddFolder.scss'
import Badge from '../Badge/Badge';
import x from '../../assets/img/x.svg'

const AddFolder = ({ colors, onAddList }) => {

  const [popup, setPopup] = useState(false)
  const [selectColor, setSelectColor] = useState(colors[0].id)
  const [inputValue, setInputValue] = useState('')
  
  const item = [
    {
      icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      name: 'Добавить папку',
      className: 'list-btn'
    }    
  ]

  const onClose = () => {
    setPopup(false)
    setInputValue('')
    setSelectColor(colors[0].id)
  }

  const addListHandler = () => {
    if (!inputValue) {
      alert('Введите название списка')
      return
    }
    
    const color = colors.filter( c => c.id === selectColor)[0].name
    onAddList( { id: Date.now(), name: inputValue, color })

    setPopup(false)
    setInputValue('')
    setSelectColor(colors[0].id) 
  }
 
  return (
    <>
      <MenuList items={item} onClick={() => setPopup(!popup)}/>
    { popup && 
      <div className="add-list__popup">
      <img src={x} alt='close button' className="add-list__popup-close-btn" onClick={onClose}/>

      <input 
        type="text" 
        placeholder='Название папки' 
        className='field'
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />

      <div className="add-list__popup-colors">      
        { 
          colors.map( color => 
          <Badge 
            onClick={() => setSelectColor(color.id)} 
            color={color.name} key={color.id} 
            className={selectColor === color.id && "active"} 
          />) 
        }
      </div>      
      <button className="btn" onClick={addListHandler}>Добавить</button>       
      </div>
    }

      
    </>
  );
}

export default AddFolder;
