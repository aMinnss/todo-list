
import { useState } from 'react'
import './App.css'
import Tasks from './components/Tasks'
import Modal from './components/Modal';
function App() {

  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTodos, setEditTodos] = useState(null); // тут будет хранится задача, которую редактируем
  const [filter, setFilter] = useState('ALL');

  function closeModal() {
    setModalOpen(false);
  }

  function applyModal(newTaskText) {
    if (editTodos) {
      setTodos(todos.map(item => item.id === editTodos.id ? {...item, taskItem:newTaskText, isCompleted: false} : item));
    } else {
      setTodos([...todos, {id: Date.now(), taskItem:newTaskText, isCompleted: false}])
    }
    setEditTodos(null);
    setModalOpen(false);
  }
    // todos - массив объектов. каждый объект = одна задача
    // id: Date.now() - нам нужен уникальный id для каждой задачи. Date.now() = текущее время в миллисекундах. Оно всегда разное -> id уникальный
    // taskItem (из Modal) попадает в applyButton как newTaskText
    // isCompleted: false - новая задача еще не выполнена

  const deleteItem = (id) => {
    setTodos(todos.filter(item =>  item.id !== id));
  };
    // filter - возвращает новый массив, оставляя только элементы подходящие под условие
    // item - каждый элемент массива по очереди
    // item.id !== id -> оставь все задачи, id которых НЕ равен тому, который мы хотим удалить

  const editItem = (task) => {
    setEditTodos(task);
    setModalOpen(true);
  };

  const toggleComplete = (id) => {
    setTodos( todos.map(item => item.id ===id ? { ...item, isCompleted: !item.isCompleted} : item));
  };

  const filteredTodos = todos
      .filter(item =>
    item.taskItem.toLowerCase().includes(search.toLowerCase())
  )
      .filter(todo => {
        if (filter === 'ALL') return  true;
        if (filter === 'DONE') return  todo.isCompleted;
        if (filter === 'NOT-DONE') return  !todo.isCompleted;
      })
  ;
    // toLowerCase() — чтобы поиск был без учета регистра
    // includes() — проверяет, есть ли текст внутри задачи

  return (
    <div className='app'>
      <div className='todo-container'>
        <h1>TODO LIST</h1>
        <div className='top-bar'>
          <input type="text" placeholder='Search note...' value={search} onChange={(e) => setSearch(e.target.value)}/>
          {/*<button className='filter-btn'>ALL</button>*/}
          <select className='filter-btn' value={filter} onChange={(e) => setFilter(e.target.value)} >
            <option value={'ALL'}>ALL</option>
            <option value={'DONE'}>DONE</option>
            <option value={'NOT-DONE'}>NOT-DONE</option>
          </select>
        </div>
        <Tasks tasks={filteredTodos} editButton={editItem} deleteButton={deleteItem} toggleComplete={toggleComplete}/>
        <button className='add-btn' onClick={() => {setModalOpen(true)}}>+</button>
        {modalOpen && <Modal closeButton={closeModal} applyButton={applyModal} editTodos={editTodos}/>}
      </div>
    </div>
  )
}

export default App
