

function FinishedList({location, initialState, onClickTodoItem, onDeleteTodoItem}) {

    this.state = {...initialState};

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }

        this.render();
    }

    this.render = (finishedTodo) => {

        const p = document.querySelector('.finished-todo-list-count');
        p.textContent = finishedTodo.length;

        location.innerHTML = '';

        finishedTodo.map(todo => {
            const li = document.createElement('li');
            const btn = document.createElement('button');

            li.className = "todo-middle-text todo-item finished-todo-item";
            li.id = todo.todoID;
            btn.className = "delete-btn";

            li.textContent = todo.todoContent;
            li.appendChild(btn);

            li.addEventListener('click', (e) => {
                if (e.target.className !== 'delete-btn') {
                    onClickTodoItem({id: todo.todoID, todoContent: todo.todoContent});
                }   else {
                    onDeleteTodoItem(todo.todoID);
                }
            })

            location.appendChild(li);
        })
    }

    this.render(this.state.finishedTodo);
}

export default FinishedList