import React from 'react';
import { useState } from 'react';
import './index.css'

function App() {
    return (
        <article>
            <List />
        </article>
    )
}

function List() {

    const [shopList, setShopList] = useState(Array());
    const [changed, setChanged] = useState(Array());
    const [style, setStyle] = useState(Array());
    const [bought, setBought] = useState({bought: 0, total: 0});

    function handleButtonClick() {
        const newShopList = shopList.slice();
        const newChangedList = changed.slice();
        const newStyle = style.slice();
        let len = shopList.length;
        newStyle.push({textDecoration: 'none'});
        setStyle(newStyle);
        newShopList.push(<Item title="Potato" style={style[len]} handleClick={() => handleItemClick(len)}/>);
        newChangedList.push(false);
        setShopList(newShopList);
        handleBought(bought.bought, bought.total + 1);
    }

    function handleItemClick(i) {
        handleStyle(i);
        let total = bought.total;
        let bought = bought.bought + 1;
        setBought({bought: bought, total: total});
    }

    function handleStyle(i) {
        const newChangedList = changed.slice();
        newChangedList[i] = !newChangedList[i];
        const newStyle = style.slice();
        if (newChangedList[i]) {
            newStyle[i] = {textDecoration: 'line-through'};
        }
        else {
            newStyle[i] = {textDecoration: 'none'};
        }
        setChanged(newChangedList);
        setStyle(newStyle);
    }

    function handleBought(bought, total) {
        setBought({bought: bought, total: total});
    }

    return(
        <article>
            <h1>Куплено товаров: {bought.bought} / {bought.total}</h1>
            <ul>{shopList}</ul>
            <AddButton handleClick={handleButtonClick} />
        </article>
    )
}

function Item({title, style, handleClick}) {

    const [state, setState] = useState({style: {textDecoration: 'none'}, isChanged: false});

    function handleClick2() {
        if (state.isChanged) {
            setState({style: {textDecoration: 'none'}, isChanged: false})
        }
        else {
            setState({style: {textDecoration: 'line-through'}, isChanged: true});
        }
    }

    return (
        <li>
            <h2 style={style} className="list-item" onClick={handleClick}>
                {title}
            </h2>
        </li>
    )
}

function AddButton({handleClick}) {
    return(
        <button className='add-button' onClick={handleClick}>
            +
        </button>
    )
}

export default App;