import WaitingList from './WaitingList.js';
import FinishedList from './FinishedList.js';
import AddTodoBtn from './AddTodoBtn.js';

function App({app, initialState, todoID}) {

    this.todoID = localStorage.getItem('todoID') ? JSON.parse(localStorage.getItem('todoID')) : todoID;
    this.state = {
        waitingTodo: localStorage.getItem('waitingTodo') ? JSON.parse(localStorage.getItem('waitingTodo')) : initialState.waitingTodo,
        finishedTodo: localStorage.getItem('finishedTodo') ? JSON.parse(localStorage.getItem('finishedTodo')) : initialState.finishedTodo,
    };
    this.setState = (nextState) => {

        this.state = {
            ...this.state,
            ...nextState
        }

        localStorage.setItem('todoID', JSON.stringify(this.todoID));
        localStorage.setItem('waitingTodo', JSON.stringify([...this.state.waitingTodo]));
        localStorage.setItem('finishedTodo', JSON.stringify([...this.state.finishedTodo]));

        this.render();
    }

    this.onAddTodo = (value) => {
        this.todoID++;
        this.setState({
            waitingTodo: [
                {
                    todoID: this.todoID,
                    todoContent: value,
                },
                ...this.state.waitingTodo,
            ],
        });
    }

    this.onClickWaitingTodoItem = ({id, todoContent}) => {
        this.setState({
            waitingTodo: this.state.waitingTodo.filter(todo => todo.todoID !== id),
            finishedTodo: [
                {
                    todoID: id,
                    todoContent: todoContent,
                },
                ...this.state.finishedTodo,
            ],
        })
    }

    this.onClickFinishedTodoItem = ({id, todoContent}) => {
        this.setState({
            waitingTodo: [
                {
                    todoID: id,
                    todoContent: todoContent,
                },
                ...this.state.waitingTodo,
            ],
            finishedTodo: this.state.finishedTodo.filter(todo => todo.todoID !== id),
        })
    }

    this.onDeleteWaitingTodoItem = (id) => {
        this.setState({
            waitingTodo: this.state.waitingTodo.filter(todo => todo.todoID !== id),
        })
    }

    this.onDeleteFinishedTodoItem = (id) => {
        this.setState({
            finishedTodo: this.state.finishedTodo.filter(todo => todo.todoID !== id),
        })
    }

    this.addTodoBtn = new AddTodoBtn({onAddTodo: this.onAddTodo});

    this.render = () => {

        this.waitingList = new WaitingList({
            location: document.querySelector('.waiting-list'), 
            initialState: {
                waitingTodo: this.state.waitingTodo,
                todoID: this.todoID,
            },
            onClickTodoItem: this.onClickWaitingTodoItem,
            onDeleteTodoItem: this.onDeleteWaitingTodoItem,
        })
    
        this.finishedList = new FinishedList({
            location: document.querySelector('.finished-list'),
            initialState: {
                finishedTodo: this.state.finishedTodo,
                todoID: this.todoID,
            },
            onClickTodoItem: this.onClickFinishedTodoItem,
            onDeleteTodoItem: this.onDeleteFinishedTodoItem,
        })

    }
    
    this.render();
}

new App({
    app: document.querySelector('.app'), 
    initialState: {
        waitingTodo: [],
        finishedTodo: [],
    },
    todoID: -1,
});