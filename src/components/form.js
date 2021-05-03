import React from 'react';
import { connect } from 'react-redux';
import { FORM_INITIAL_VALUE, FORM_HANDLE_CHANGE } from "../actions/actions";
const users = ["--select--", "Jonny Strömberg", "Jonas Arnklint", "Martina Elm", "Gustaf Lindqvist"]
function TaskForm(props) {
    const handleSubmit = (props) => {
        try {
            if (props.formValues.taskDescription) {
                if (props.formValues.id) {
                    props.accordian(props.formValues, "update")
                } else {
                    props.accordian(props.formValues, "create")
                    props.dispatch({ type: FORM_INITIAL_VALUE });
                }
            } else {
                alert("Task Descrition is manditory")
            }
        } catch (e) {
            console.error(e.message)
        }
    }
    const handleCancel = async (props) => {
        props.accordian()
    }
    const myChangeHandler = (event, id, props) => {
        props.dispatch({
            type: FORM_HANDLE_CHANGE,
            ...props.formValues,
            [id]: event.target.value
        })

    }
    function getOption() {
        return users.map((user, index) => <option key={`${index}`} value={user}>{user}</option>)
    }
    function getFields() {
        return props.formValues && Object.keys(props.formValues).map(id => {
            switch (id) {
                case "taskDescription":
                    return <div key={id}>
                        <label className="element-display">Task Description</label>
                        <input type="text" name="taskDescription" value={props.formValues[id]} onChange={(e) => myChangeHandler(e, id, props)}></input>
                    </div>
                case "date":
                    return <div key={id}>
                        <label htmlFor="date" className="element-display">Date:</label>
                        <input type="date" id="date" name="date" value={props.formValues[id]} onChange={(e) => myChangeHandler(e, id, props)}></input>
                    </div>
                case "time":
                    return <div key={id}>
                        <label htmlFor="time" className="element-display">Time:</label>
                        <input type="time" id="time" name="time" value={props.formValues[id]} onChange={(e) => myChangeHandler(e, id, props)} ></input>
                    </div>
                case "assignUser":
                    return <div key={id}>
                        <label htmlFor="cars" className="element-display">Assign User:</label>
                        <select name="cars" id="cars" value={props.formValues[id].length === 0 ? "" : props.formValues[id]} onChange={(e) => myChangeHandler(e, id, props)}>
                            {getOption()}
                        </select>
                    </div>

                default:
                    return null
            }
        })
    }
    return (
        <form >
            {getFields()}
            <div className="footer">
                <button
                    variant="contained"
                    color="primary"
                    className="cancel-btn"
                    onClick={e => { e.preventDefault(); handleCancel(props) }}
                >
                    Cancel
          </button>
                <button
                    type="submit"
                    className="submit-btn"
                    onClick={e => { e.preventDefault(); handleSubmit(props) }}
                >
                    Save
          </button>
            </div>

        </form>
    );
}
const mapStateToProps = (state) => {
    return {
        formValues: state.formValues
    };
}

export default connect(mapStateToProps)(TaskForm);
