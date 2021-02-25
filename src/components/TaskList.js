import React, {Component, useEffect, useState} from 'react';
import Task from "./Task";

const List = (props) => {
    const {tasks} = props;
    const [nameFilter, setNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState(-1);
    const renderTask = tasks.map((task, index) => {
        return (
            <Task key={task.id} id={task.id} index={index} name={task.name} status={task.status}
                  onUpdateStatus={props.onUpdateStatus} onDeleteTask={props.onDeleteTask}
                  onEditTask={props.onEditTask}/>
        )
    })
    useEffect(() => {
        props.onFilterChange(nameFilter, statusFilter);
    },[nameFilter, statusFilter])

    return (
        <table className="table table-bordered table-hover">
            <thead>
            <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td/>
                <td>
                    <input type="text" className="form-control" name="filter-name"
                           placeholder="Nhập tên để tìm kiếm.." value={nameFilter}
                           onChange={event => setNameFilter(event.target.value)}/>
                </td>
                <td>
                    <select className="form-control" name="filter-status" value={statusFilter}
                            onChange={event => setStatusFilter(event.target.value)}>
                        <option value={-1}>Tất Cả</option>
                        <option value={0}>Ẩn</option>
                        <option value={1}>Kích Hoạt</option>
                    </select>
                </td>
                <td/>
            </tr>
            {renderTask}
            </tbody>
        </table>
    )
}
export default List;