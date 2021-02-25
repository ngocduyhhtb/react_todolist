import React, {Component} from 'react';
import TaskForm from "./components/TaskForm";
import Search from "./components/Search";
import TaskList from "./components/TaskList";
import tasks from "./data/todo";
import {v4 as uuidv4} from "uuid";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTaskForm: false,
            tasks: tasks,
            editTask: null,
            filter: {
                nameFilter: '',
                statusFilter: -1,
            },
            sort: {
                by: '',
                value: 0,
            }
        }
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('task')) {
            const tasks = JSON.parse(localStorage.getItem('task'));
            this.setState({
                tasks: tasks
            })
        }
    }

    loadData = () => {
        this.setState({
            tasks: tasks,
        })
    }
    toggleTaskForm = () => {
        if (this.state.showTaskForm) {
            this.setState({
                editTask: null,
            })
        } else {
            const isShow = !this.state.showTaskForm;
            this.setState({
                showTaskForm: isShow,
                editTask: null,
            })
        }
    }
    displayForm = () => {
        this.setState({
            showTaskForm: true,
        })
    }
    closeForm = () => {
        this.setState({
            showTaskForm: false,
        })
    }

    onAddNewTask = (name, status) => {
        const {tasks} = this.state;
        tasks.push({id: uuidv4(), name: name, status: status});
        this.setState({
            tasks: tasks,
        });
        localStorage.setItem('task', JSON.stringify(tasks));
        this.closeForm();
    }

    onUpdateTask = (id, name, status) => {
        const {tasks} = this.state;
        const index = this.findIndex(id);
        tasks[index].id = id;
        tasks[index].name = name;
        tasks[index].status = status
        this.setState({
            tasks: tasks,
        });
        localStorage.setItem('task', JSON.stringify(tasks));
        this.toggleTaskForm();
    }

    onUpdateStatus = (id) => {
        const {tasks} = this.state;
        const index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks,
            });
            localStorage.setItem('task', JSON.stringify(tasks));
        }
    }

    onDeleteTask = (id) => {
        const {tasks} = this.state;
        const index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks,
                showTaskForm: false,
            });
            localStorage.setItem('task', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
        const {tasks} = this.state;
        let result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onEditTask = (id) => {
        const {tasks} = this.state;
        const index = this.findIndex(id);
        const editTask = tasks[index];
        this.setState({
            editTask: editTask,
        });
        this.displayForm();
    }

    onFilterChange = (nameFilter, statusFilter) => {
        statusFilter = parseInt(statusFilter, 10);
        this.setState({
            filter: {
                nameFilter: nameFilter.toLowerCase(),
                statusFilter: statusFilter
            }
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue,
            }
        });
    }

    render() {
        let {tasks, showTaskForm, filter, sort} = this.state;
        if (filter) {
            if (filter.nameFilter !== '') {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().includes(filter.nameFilter);
                })
            }
            tasks = tasks.filter((task) => {
                if (filter.statusFilter === -1) {
                    return task;
                } else {
                    return task.status === (filter.statusFilter === 1);
                }
            })
        }
        if (sort.by === 'name') {
            tasks = tasks.sort((a, b) => {
                if (a.name > b.name) {
                    return sort.value;
                } else if (a.name < b.name) {
                    return -(sort.value);
                } else return 0;
            })
        } else {
            tasks = tasks.sort((a, b) => {
                if (a.status > b.status) {
                    return -(sort.value);
                } else if (a.status < b.status) {
                    return (sort.value);
                } else return 0;
            })
            console.log("sort")
        }
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div
                        className={this.state.showTaskForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4 border border-primary" : ''}>
                        {showTaskForm ?
                            <TaskForm onAddNewTask={this.onAddNewTask} onUpdateTask={this.onUpdateTask}
                                      closeTaskForm={this.closeForm}
                                      editTask={this.state.editTask}/> : ''}
                    </div>
                    <div
                        className={showTaskForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8 border border-primary' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12 border border-primary'}>
                        <div className="container-fluid">
                            <div style={{marginTop: "16px"}}>
                                <button type="button" className="btn btn-primary" onClick={this.toggleTaskForm}>
                                    <span className="fa fa-plus mr-5" style={{marginRight: "5px"}}/>Thêm công việc
                                </button>
                                &nbsp;
                                <button type="button" className="btn btn-danger" onClick={this.loadData}>
                                    <span className="fa fa-plus" style={{marginRight: "5px"}}/>Load data
                                </button>
                            </div>
                            <Search onSort={this.onSort}/>
                            <div className="col-12 mt-4">
                                <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus}
                                          onDeleteTask={this.onDeleteTask} onEditTask={this.onEditTask}
                                          onFilterChange={this.onFilterChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
