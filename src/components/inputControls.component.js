import React from "react";

export function InputControlsComponent({
  taskName,
  setTaskName,
  taskDate,
  setTaskDate,
  submitHandler,
}) {
  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          className="form-control"
          id="taskName"
          placeholder="Task name..."
          autoComplete="off"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="datePicker">Complete By:</label>
        <input
          type="date"
          className="form-control"
          id="datePicker"
          value={taskDate}
          autoComplete="off"
          placeholder="Pick a date..."
          onChange={(e) => setTaskDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-success px-5 mb-3">
        Submit
      </button>
    </form>
  );
}

export default InputControlsComponent;
