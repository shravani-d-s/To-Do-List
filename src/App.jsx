import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

import { v4 as uuidv4 } from 'uuid';

//react icons
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, []);
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos]);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleShowFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-pink-200 min-h-[80vh] md:w-[45%]">
        <h1 className='font-bold text-center text-2xl'>TaskMania - Manage your To Dos here</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a To Do</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-pink-700 hover:bg-pink-800 disabled:bg-pink-500 p-2 py-1 text-sm font-bold text-white rounded-md'>Save</button>
        </div >
        <input className="my-4" id='show' onChange={toggleShowFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor='show'>Show Finished</label>
        <div className='h-[1px] bg-black opacity-20 w-7/8 my-2 mx-auto'></div>
        <h2 className="text-xl font-bold">My To Dos</h2>
        <div className='todos'>
          {todos.length === 0 && <div className='m-5'>No ToDos to display</div>}
          {todos.map(item => {


            return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex md:w-1/2 my-3 justify-between'>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-pink-500 hover:bg-pink-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaRegEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-pink-500 hover:bg-pink-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div >

    </>
  )
}

export default App
