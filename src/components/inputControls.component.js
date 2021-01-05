import React from "react";

export function InputControlsComponent({
  taskName,
  setTaskName,
  taskDate,
  setTaskDate,
  submitHandler,
  editUniqKey,
  cancelEditHandler,
  saveEditedChangesHandler,
}) {
  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="taskName " className="font-weight-bold">
          Task Name:
        </label>
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
        <label htmlFor="datePicker" className="font-weight-bold">
          Complete By:
        </label>
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
      {editUniqKey === 0 && (
        <button type="submit" className="btn btn-success px-5 mb-3">
          Submit
        </button>
      )}
      <div className="btn-group" role="group">
        {editUniqKey !== 0 && (
          <button
            type="submit"
            className="btn btn-warning  mb-3"
            onClick={saveEditedChangesHandler}
          >
            Save Changes
          </button>
        )}

        {editUniqKey !== 0 && (
          <button
            type="submit"
            className="btn btn-secondary px-5 mb-3"
            onClick={cancelEditHandler}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default InputControlsComponent;
