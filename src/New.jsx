import React, { useState } from 'react';
import './index.css'
import plus from './images/plus.svg';

function App() {
  const [lists, setLists] = useState({});
  const [currentListId, setCurrentListId] = useState('');
  const [editListId, setEditListId] = useState(null);
  const [editListName, setEditListName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [quantityValue, setQuantityValue] = useState('1'); // Изменяем начальное состояние на строку
  const [completedItems, setCompletedItems] = useState(new Set());
  const [editItemId, setEditItemId] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');
  const [editQuantityValue, setEditQuantityValue] = useState('1'); // Строка для временного количества редактирования
  const [showLists, setShowLists] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantityValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newItem = { id: Date.now(), value: inputValue, quantity: quantityValue };
      setLists((prevLists) => {
        const updatedList = prevLists[currentListId] || [];
        return {
          ...prevLists,
          [currentListId]: [...updatedList, newItem],
        };
      });
      setInputValue('');
      setQuantityValue('1'); // Сбрасываем количество
    }
  };

  const handleDeleteItem = (id) => {
    setLists((prevLists) => {
      const updatedList = prevLists[currentListId].filter(item => item.id !== id);
      return {
        ...prevLists,
        [currentListId]: updatedList,
      };
    });

    const newCompletedItems = new Set(completedItems);
    newCompletedItems.delete(id);
    setCompletedItems(newCompletedItems);
  };

  const handleToggleComplete = (id) => {
    const newCompletedItems = new Set(completedItems);
    if (newCompletedItems.has(id)) {
      newCompletedItems.delete(id);
    } else {
      newCompletedItems.add(id);
    }
    setCompletedItems(newCompletedItems);
  };

  const handleCreateList = () => {
    const listId = prompt("Введите название списка:");
    if (listId) {
      setLists((prevLists) => ({
        ...prevLists,
        [listId]: [],
      }));
      setCurrentListId(listId);
    }
  };

  const handleDeleteList = (id) => {
    setLists((prevLists) => {
      const newLists = { ...prevLists };
      delete newLists[id];
      return newLists;
    });

    if (currentListId === id) {
      setCurrentListId('');
    }
  };

  const handleEditList = (id) => {
    setEditListId(id);
    setEditListName(id);
  };

  const handleChangeListName = () => {
    if (editListName && editListId) {
      setLists((prevLists) => {
        const newLists = { ...prevLists };
        newLists[editListName] = newLists[editListId];
        delete newLists[editListId];
        return newLists;
      });
      if (currentListId === editListId) {
        setCurrentListId(editListName);
      }
      setEditListId(null);
      setEditListName('');
    }
  };

  const handleSwitchList = (id) => {
    setCurrentListId(id);
    setCompletedItems(new Set());
  };

  const startEditItem = (id, value, quantity) => {
    setEditItemId(id);
    setEditInputValue(value);
    setEditQuantityValue(quantity);
  };

  const saveEditItem = (id) => {
    setLists((prevLists) => {
      const updatedList = prevLists[currentListId].map(item => {
        if (item.id === id) {
          return { 
            ...item, 
            value: editInputValue, 
            quantity: editQuantityValue // Сохраняем любое количество
          };
        }
        return item;
      });
      return {
        ...prevLists,
        [currentListId]: updatedList,
      };
    });
    setEditItemId(null);
    setEditInputValue('');
    setEditQuantityValue('1'); // Сброс количества после редактирования
  };

  const returnList = () => {
    setShowLists(!showLists);
  }

  return (
    <div className='Background'>
    <div className="App">
      <button onClick={handleCreateList} id='add-list'><img src={plus} />Создать</button>
      <h2>Списки:</h2>
      <div className='Lists'>
        {Object.keys(lists).map((listId) => (
          <div className='List'>
            {editListId !== listId ? (
              <>
                <span onClick={() => handleSwitchList(listId)}>
                  {currentListId === listId ? <strong>{listId}</strong> : listId}
                </span>
                <span></span>
                <div className='list-button'>
                  <button onClick={() => handleEditList(listId)}>Редактировать</button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={editListName}
                  onChange={(e) => setEditListName(e.target.value)}
                />
                <span></span>
                <div>
                  <button onClick={handleChangeListName}>Сохранить</button>
                </div>
              </>
            )}
            <div className='list-button'>
              <button onClick={() => handleDeleteList(listId)} style={{ marginLeft: '10px' }}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {currentListId && (
      <>
      <div className='circle'>
  <svg width="100" height="100">
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="lightgray"
      strokeWidth="10"
      fill="none"
    />
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="green"
      strokeWidth="10"
      fill="none"
      strokeDasharray={`${(completedItems.size / lists[currentListId].length) * 282} ${282}`}
      style={{ transition: 'stroke-dasharray 0.5s ease' }}
    />
    <text 
      x="50" 
      y="55" 
      fontSize="20" 
      textAnchor="middle" 
      fill="white"
    >
      {completedItems.size}/{lists[currentListId].length}
    </text>
  </svg>
</div>
        <div className='inputs'>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Введите название товара"
          />
          <input
            type="text"
            value={quantityValue}
            onChange={handleQuantityChange}
            placeholder="Введите количество товара"
          />
          </div>
          <button onClick={handleAddItem} className='add-item'><img src={plus} />Добавить</button>
          <ul>
            {lists[currentListId].map((item) => (
              <li
                key={item.id}
                onClick={() => handleToggleComplete(item.id)}
                style={{
                  textDecoration: completedItems.has(item.id) ? 'line-through' : 'none',
                }}
              >
                {editItemId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editInputValue}
                      onChange={(e) => setEditInputValue(e.target.value)}
                    />
                    <input
                      type="text"
                      value={editQuantityValue}
                      onChange={(e) => setEditQuantityValue(e.target.value)}
                    />
                    <button onClick={() => saveEditItem(item.id)}>Сохранить</button>
                  </>
                ) : (
                  <>
                    {item.value} ({item.quantity}) {/* отображаем количество */}
                    <span></span>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }} style={{textDecoration: 'none'}}>Удалить</button>
                    <button onClick={(e) => { e.stopPropagation(); startEditItem(item.id, item.value, item.quantity); }} style={{textDecoration: 'none'}}>Редактировать</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
    </div>
  );
}

export default App;