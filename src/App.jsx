import React, { useState } from 'react';

function App() {
  const items = [
    { id: 1, name: 'Платье' },
    { id: 2, name: 'Помидоры' },
    { id: 3, name: 'Сыр' },
    { id: 4, name: 'Хлеб' },
  ];

  const [checkedItems, setCheckedItems] = useState(Array(items.length).fill(false));

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const completedCount = checkedItems.filter(Boolean).length;
  const totalCount = items.length;

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#1e1e1e', color: '#ffffff', padding: '20px' }}>
      <h1>Еженедельные покупки</h1>
      <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
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
            strokeDasharray={`${(completedCount / totalCount) * 282} ${282}`}
            style={{ transition: 'stroke-dasharray 0.5s ease' }}
          />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '20px' }}>
          {completedCount}/{totalCount}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        {items.map((item, index) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            <span style={{ marginLeft: '10px' }}>{item.name}</span>
          </div>
        ))}
      </div>
      <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#b58d4a', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Добавить
      </button>
    </div>
  );
}

export default App;