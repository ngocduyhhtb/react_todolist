import React, {Component, useState} from 'react';

const Search = (props) => {
    const onSort = (_sortBy, _sortValue) => {
        props.onSort(_sortBy, _sortValue);
    }
    return (
        <div className="row" style={{marginTop: "26px"}}>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Nhập từ khóa..."/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button">
                            <span className="fa fa-search" style={{marginRight: "5px"}}/>Tìm
                        </button>
                    </span>
                </div>
            </div>
            <div className="col-6">
                <div className="btn-group">
                    <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown" aria-expanded="false">Sắp xếp
                    </button>
                    <ul className="dropdown-menu">
                        <li onClick={() => {
                            onSort('name', -1)
                        }}><a className="dropdown-item" href="#">Tên A - Z </a></li>
                        <li onClick={() => {
                            onSort('name', 1)
                        }}><a className="dropdown-item" href="#">Tên Z - A</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li onClick={() => {
                            onSort('status', -1)
                        }}><a className="dropdown-item" href="#">Trạng thái ẩn</a></li>
                        <li onClick={() => {
                            onSort('status', 1)
                        }}><a className="dropdown-item" href="#">Trạng thái kích hoạt</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};
export default Search;
