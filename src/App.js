import { useState } from "react";
import { Form } from "./components/Form";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "charger", quantity: 1, packed: false },
// ];
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  //comment add
  function handleClear() {
    const Confirmed = window.confirm(
      "Are you sure you want to delete all itmes "
    );
    if (Confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onHandleItem={handleToggleItem}
        Clear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝 Far Away 🧳</h1>;
}
function PackingList({ items, onDeleteItem, onHandleItem, Clear }) {
  const [sortby, setSortby] = useState("input");
  let sortedItems;

  if (sortby === "input") sortedItems = items;
  if (sortby === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortby === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            items={item}
            onDeleteItem={onDeleteItem}
            onHandleItem={onHandleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortby} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description </option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={Clear}>Clear Item</button>
      </div>
    </div>
  );
}
function Item({ items, onDeleteItem, onHandleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={items.checked}
        onChange={() => {
          onHandleItem(items.id);
        }}
      />
      <span style={items.packed ? { textDecoration: "line-through" } : {}}>
        {items.description} {items.quantity}
      </span>
      <button onClick={() => onDeleteItem(items.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>start adding some items to your list</em>
      </p>
    );
  const numLists = items.length;
  const numPacked = items.filter((items) => items.packed).length;
  const Percentage = Math.round((numPacked / numLists) * 100);
  return (
    <footer className="stats">
      {" "}
      <em>
        {Percentage === 100
          ? "You got everything ! Ready to go"
          : `You have ${numLists} items on your list and you already packed
        ${numPacked} (${Percentage}%)`}
      </em>
    </footer>
  );
}
