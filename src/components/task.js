import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit, AiOutlineDelete, AiOutlineShareAlt } from "react-icons/ai";
import "./task.css";
import { FORM_INITIAL_VALUE, FORM_HANDLE_CHANGE, Active, DELETE_TASK, CREATE_TASK, UPDATE_TASK } from "../actions/actions";
import TaskForm from "./form";


class TaskManagement extends Component {

  handleAccordianClick = (status) => {
    this.props.dispatch({
      type: 'Active',
      value: !status
    });
    this.props.dispatch({
      type: FORM_INITIAL_VALUE
    });
  }
  handleEdit = (taskValue) => {
    this.props.dispatch({
      type: 'Active',
      value: true
    });
    this.props.dispatch({
      type: FORM_HANDLE_CHANGE,
      ...taskValue
    });
  }
  handleDelete = (taskValue) => {
    // delete taskValue["type"]
    this.props.dispatch({
      type: Active,
      value: false
    });
    this.props.dispatch({
      ...taskValue,
      type: DELETE_TASK,
    });
  }
  updateAccordian = (values, type) => {
    switch (type) {
      case "create":
        values["id"] = parseInt(Math.random() * 10000);
        this.props.dispatch({
          type: CREATE_TASK,
          value: values
        });
        break;
      case "update":
        this.props.dispatch({
          type: UPDATE_TASK,
          value: values
        });
        break;
      default:
        break;
    }
    this.props.dispatch({
      type: Active,
      value: false
    });
  }
  handleShare(task) {
    const phoneNumber = prompt("Please enter 10 digit phonenumber.");
    const text = `Description:${task.taskDescription} Date:-${task.date}`
    window.open(`https://wa.me/+91${phoneNumber}?text=${encodeURI(text)}`)
  }
  render() {
    return (
      <div className="root-container">
        <div className="accordian-container">
          <div className={`accordion ${this.props.active ? "active" : ""}`} >
            <label>{`Tasks(${this.props.taskValues.length})`}</label>
            {!this.props.active ? <AiOutlinePlus style={{ float: "right" }} onClick={() => this.handleAccordianClick(this.props.active)}></AiOutlinePlus> : null}
            {this.props.active ? <AiOutlineMinus style={{ float: "right" }} onClick={() => this.handleAccordianClick(this.props.active)}></AiOutlineMinus> : null}
          </div>
          <div className={this.props.active ? "panel element-display" : "panel element-hide"}>

            <TaskForm accordian={this.updateAccordian} />

          </div>
        </div>

        <div className="card card-root">
          <h1>Created Task</h1>
          {
            this.props.taskValues.length > 0 ?
              this.props.taskValues.map((task, index) => {
                return <div key={`${index}_${task.id}`} className="card-container">
                  <div id={task.id}>
                    <h4><b>{task.assignUser}</b></h4>
                    <p>{task.taskDescription}</p>
                  </div>

                  <AiOutlineEdit style={{ "marginLeft": "30px" }} onClick={() => this.handleEdit(task)}></AiOutlineEdit>
                  <AiOutlineDelete style={{ "marginLeft": "30px" }} onClick={() => this.handleDelete(task)}></AiOutlineDelete>
                  <AiOutlineShareAlt style={{ "marginLeft": "30px" }} onClick={() => this.handleShare(task)}></AiOutlineShareAlt>
                </div>
              })
              : <p>No Tasks found</p>
          }

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    number: state.number,
    active: state.active,
    taskValues: state.taskValues
  };
}

export default connect(mapStateToProps)(TaskManagement);
