import React, {Component} from 'react'

const Task = (props) => {
    const {id, index, name, status} = props;
    const onUpdateStatus = () => {
        props.onUpdateStatus(id);
    }
    const onDeleteTask = () => {
        props.onDeleteTask(id);
    }
    const onEditTask = () => {
        props.onEditTask(id);
    }
    return (
        <React.Fragment>
            <tr>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td className="text-center label label-success">
                    <span className={status === true ? "text-white bg-success p-1" : "text-white bg-danger p-1"}
                          style={{cursor: "pointer"}}
                          onClick={onUpdateStatus}>{status === true ? "Kích Hoạt" : "Ẩn"}</span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={onEditTask}>
                        <span className="fa fa-pencil mr-5"/>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={onDeleteTask}>
                        <span className="fa fa-trash" style={{marginRight: "5px"}}/>Xóa
                    </button>
                </td>
            </tr>
        </React.Fragment>
    )
}
export default Task;
