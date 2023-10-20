import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.querySelector('.todo-list') as HTMLUListElement

  const inputTodo = document.getElementById('input-todo') as HTMLInputElement

  const buttonTodo = document.getElementById('save-todo') as HTMLButtonElement
  const clearTodo = document.getElementById('clear-todo') as HTMLButtonElement

  function addNewTodo (textValue: string) {
    const html = `
    <li class="todo-list-element">
      <p>${textValue}</p>
      <div class="btn-container">
        <button class="btn btn--status incomplete">
          <img src="./src/assets/tick-square-svgrepo-com.svg">
          <p>Done</p>
        </button>
        <button class="btn btn--delete">
          <img src="./src/assets/x-symbol-svgrepo-com.svg">
          <p>Delete</p>
        </button>
      </div>
    </li>
    `
    todoList.insertAdjacentHTML('afterbegin', html)
  }

  todoList.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    if (target.classList.contains('btn--delete')) {
      const todoItem = target.closest('.todo-list-element') as HTMLLIElement
      if (todoItem) {
        todoItem.remove()
        if (todoList.children.length === 0) {
          todoList.style.display = 'none'
        }
      }
    }

    if (target.classList.contains('btn--status')) {
      const pEl = target.parentElement?.parentElement?.querySelector('p')
      if (target.classList.contains('incomplete')) {
        target.classList.remove('incomplete')
        target.classList.add('complete')
        if (pEl) {
          pEl.style.textDecoration = 'line-through'
          pEl.style.textDecorationColor = '#00C55A'
        }
      } else {
        target.classList.remove('complete')
        target.classList.add('incomplete')
        if (pEl) {
          pEl.style.textDecoration = 'none'
        }
      }
    }
  })

  buttonTodo.addEventListener('click', () => {
    if (inputTodo.value) {
      todoList.style.display = 'flex'
      addNewTodo(inputTodo.value)
      inputTodo.value = ''
    }
  })

  clearTodo.addEventListener('click', () => {
    todoList.style.display = 'none'
    todoList.innerHTML = ''
  })
})