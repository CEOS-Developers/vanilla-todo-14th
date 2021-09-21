

function WaitingList({location, initialState, onClickTodoItem, onDeleteTodoItem}) {

    this.state = {...initialState};

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }

        this.render();
    }

    this.render = (waitingTodo) => {
        location.innerHTML = '';
        waitingTodo.map(todo => {
            const li = document.createElement('li');
            const btn = document.createElement('button');

            li.className = "todo-middle-text todo-item waiting-todo-item";
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

    this.render(this.state.waitingTodo);
}

export default WaitingList