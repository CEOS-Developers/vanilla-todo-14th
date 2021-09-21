

function AddTodoBtn({onAddTodo}) {

    this.addTodoForm = document.querySelector('.add-todo-form');
    this.addTodoInput = document.querySelector('.add-todo-input');

    this.addTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        onAddTodo(this.addTodoInput.value);
        this.addTodoInput.value = '';
    });
    

}

export default AddTodoBtn