import React, { useState } from 'react';
import './App.css';

//define what each item in the To-Do list can do
//takes in todo object, the index, and the function to set as complete
function Todo({ todo, index, completeTodo, removeTodo, colors, newPriority }) {
  //determines which background color to use
  //based on priority
  var color = ""
  if(todo.priority === "a"){color = colors[0]}
  else if(todo.priority === "b"){color = colors[1]}
  else if(todo.priority === "c"){color = colors[2]}
  else if(todo.priority === "d"){color = colors[3]}
  else {color = colors[4]}

  return (
    //displays the text of the todo object
    //has a classname with its priority, for styling purposes
    //is line-through if completed
    //background color based on priority
    <div
      className={"priority-" + todo.priority + "-card"}
      style={{ textDecoration: todo.isCompleted ? "line-through" : "", 
               background: color }}
    >
      {todo.text}
      <PrioritySetter
        index={index}
        newPriority={newPriority}
        defaultPriority="e"
      />

      <div>
        {/* when you click the complete button, sets isComplete = true */}
        <button onClick={() => completeTodo(index)}>Complete</button>
        {/* when you click the delete button, removes item */}
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  )
}

//sets up the form to add items to the to-do list
function TodoForm({ addTodo }) {
  const [value, setValue] = useState("")
  // const [priority, setPriority] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    //if there's nothing in the input, do nothing
    // if (!value || !priority) return
    if (!value) return
    //otherwise addTodo
    addTodo(value, "a")
    //then clear the value
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        className="input"
        placeholder="To-Do, then choose priority:"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {/* <input 
        type="radio"
        name="priority"
        className="input"
        value="a"
        id="priorityA"
        onChange={e => setPriority(e.target.value)}
      />
      <label htmlFor="priorityA">A</label>
      <input 
        type="radio"
        name="priority"
        className="input"
        value="b"
        id="priorityB"
        onChange={e => setPriority(e.target.value)}
      />
      <label htmlFor="priorityB">B</label>
      <input 
        type="radio"
        name="priority"
        className="input"
        value="c"
        id="priorityC"
        onChange={e => setPriority(e.target.value)}
      />
      <label htmlFor="priorityC">C</label>
      <input 
        type="radio"
        name="priority"
        className="input"
        value="d"
        id="priorityD"
        onChange={e => setPriority(e.target.value)}
      />
      <label htmlFor="priorityD">D</label>
      <input 
        type="radio"
        name="priority"
        className="input"
        value="e"
        id="priorityE"
        onChange={e => setPriority(e.target.value)}
      />
      <label htmlFor="priorityE">E</label> */}
    </form>
  )
}

function ColorPicker({ index, currColor, changeColor }) {
  const handleSubmit = e => {
    e.preventDefault()
    changeColor(index, e.target.value)
  }

  var label = ""
  if (index === 0) {
    label = "a"
  } else if (index === 1) {
    label = "b"
  } else if (index === 2) {
    label = "c"
  } else if (index === 3) {
    label = "d"
  } else {
    label = "e"
  }

  return (
    <div>
      <input type="color" id={"color" + index} name={label}
            value={currColor}
            onChange={handleSubmit}
      />
      <label htmlFor={"color" + index}>{label.toUpperCase()}</label>
    </div>
  )
}

function PrioritySetter({ index, newPriority, defaultPriority }){
  const changePriority = e => {
    console.log("def", defaultPriority)
    console.log("next", e.target.value)
    newPriority(index, e.target.value)
  }

  return (
    <select defaultValue={defaultPriority} onChange={e => changePriority(e)}>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
          <option value="e">E</option>
    </select>
  )
}

function App() {
  //items in the to-do list have text and whether they're completed
  //defaults isCompleted to false
  const [todos, setTodos] = useState([])
  //sets up default colors
  const [colors, setColors] = useState([
    "#e70808", 
    "#363ae5",
    "#42c308",
    "#970bd2",
    "#a3a2a2"
  ])

  //adds a to-do item
  const addTodo = (text, priority) => {
    //adds the new item on the end of the todos list
    //priority is from a - e in that order of priority
    //isCompleted defaults to false
    const newTodos = [...todos, { text: text, isCompleted: false, priority: priority }]
    //sorts newTodos before setting it
    //first by priority (a - e) then alphabetically
    newTodos.sort((a,b) => (a.priority > b.priority) ? 1 : (a.priority === b.priority) ? ((a.text > b.text)) ? 1 : -1 : -1)
    //sets the new to-do list
    setTodos(newTodos)
  }

  //marks a to-do item as completed
  const completeTodo = index => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = !todos[index].isCompleted
    setTodos(newTodos)
  }

  //deletes an individual to-do item
  const removeTodo = index => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const newPriority = (index, newPrior) => {
    const newTodos = [...todos]
    newTodos[index].priority = newPrior
    newTodos.sort((a,b) => (a.priority > b.priority) ? 1 : (a.priority === b.priority) ? ((a.text > b.text)) ? 1 : -1 : -1)
    setTodos(newTodos)
  }

  //deletes all completed to-do items
  //also deletes all e-priority items (intentional design philosophy)
  const removeCompletes = e => {
    e.preventDefault()
    const newTodos = todos.filter(todo => {
      return todo.isCompleted === false
    }).filter(todo => {
      return todo.priority !== "e"
    })
    setTodos(newTodos)
  }

  const changeColor = (index, value) => {
    const newColors = [...colors]
    newColors[index] = value
    setColors(newColors)
  }

  return (
    //the render
    //maps through the todos in state, passes completeTodo
    //the form needs addTodo
    <div className="app">
      <div className="card-content">
        {todos.map((todo, i) => (
          <Todo 
            key={i}
            index={i}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            colors={colors}
            newPriority={newPriority}
          />
        ))}
        <TodoForm addTodo={addTodo} />
        <button onClick={(e) => removeCompletes(e)}>Remove Completes and E's</button>
        <div>
          {colors.map((color, i) => (
            <ColorPicker
              key={"color" + i}
              index={i}
              currColor={color}
              changeColor={changeColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
