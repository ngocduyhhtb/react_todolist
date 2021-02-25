import React, {Component, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const TaskForm = (props) => {
    const [taskId, setTaskId] = useState(null);
    const [name, setName] = useState('');
    const [status, setStatus] = useState(true);
    useEffect(() => {
        if (props.editTask) {
            setTaskId(props.editTask.id);
            setName(props.editTask.name);
            setStatus(props.editTask.status);
        } else if (!props.editTask) {
            setTaskId(null);
            setName('');
            setStatus(true);
        }
    }, [props.editTask]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === "") {
            alert("Name is empty");
        } else {
            if (taskId) {
                props.onUpdateTask(taskId, name, status);
            } else {
                props.onAddNewTask(name, status);
            }
        }
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setName('');
        setStatus('');
    }
    return (
        <div className="panel panel-warning p-3">
            <div className="panel-heading">
                <h3 className="panel-title"
                    style={{position: "relative"}}>{taskId !== null ? "Cập nhật công việc" : "Thêm công việc"}<i
                    className="far fa-times-circle"
                    style={{position: "absolute", right: 0, marginTop: "5px", cursor: "pointer"}}
                    onClick={props.closeTaskForm}/></h3>
            </div>
            <div className="panel-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="mb-2">Tên :</label>
                        <input type="text" className="form-control" name="name" value={name}
                               onChange={event => setName(event.target.value)}/>
                    </div>
                    <div className="form-group mt-3">
                        <label className="mb-2">Trạng thái:</label>
                        <select className="form-control" required="required" name="status" value={status}
                                onChange={event => setStatus(event.target.value === "true")}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                    </div>
                    <br/>
                    <div className="d-flex">
                        <button type="submit" className="btn btn-warning w-50">Thêm</button>
                        &nbsp;
                        <button type="submit" className="btn btn-danger w-50" onClick={handleCancel}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskForm;
