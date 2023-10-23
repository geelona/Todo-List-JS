import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.querySelector('.todo-list') as HTMLUListElement

  const inputTodo = document.getElementById('input-todo') as HTMLInputElement

  const buttonTodo = document.getElementById('save-todo') as HTMLButtonElement
  const clearTodo = document.getElementById('clear-todo') as HTMLButtonElement

  function addNewTodo (textValue: string) {
    const html = `
    <li class="todo-list-element">
      <p class="editable">${textValue}</p>
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

  todoList.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('editable')) {
      if (target.classList.contains('lineThrough')) {
        target.style.cursor = 'default'
      } else {
        target.style.cursor = 'text'
      }
    }
  })

  todoList.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('editable') && !target.classList.contains('lineThrough')) {

      const pEl = target as HTMLParagraphElement
      const text = pEl.innerText
      const input = document.createElement('input')
      input.value = text
      input.classList.add('editable')
      pEl.replaceWith(input)
      input.focus()

      input.addEventListener('blur', () => {
        const p = document.createElement('p')
        p.innerText = input.value
        p.classList.add('editable')
        input.replaceWith(p)
        return
      })

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const p = document.createElement('p')
          p.innerText = input.value
          p.classList.add('editable')
          input.replaceWith(p)
          return
        }
      })
    }
    
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
          pEl.classList.add('lineThrough')
        }
      } else {
        target.classList.remove('complete')
        target.classList.add('incomplete')
        if (pEl) {
          pEl.classList.remove('lineThrough')
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