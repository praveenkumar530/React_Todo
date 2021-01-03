import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export function CompeletedTableComponent({
  completedTasksArray,
  deleteButtonFromCompletedClickHandler,
  clearAllCompletedTasks,
}) {
  return (
    <div>
      <h4 className="completed-header">Completed Tasks</h4>
      {completedTasksArray.length === 0 ? <p>No records</p> : ""}
      <table
        className="table table-sm mt-2 bg-lightGreen "
        hidden={completedTasksArray.length === 0}
      >
        <thead className="table-head-completed">
          <tr>
            <th scope="col">TASK NAME</th>
            <th scope="col">COMPLETED</th>
            <th scope="col"> ACTION</th>
          </tr>
        </thead>
        <tbody>
          {completedTasksArray.map((item) => (
            <tr key={item.uniqueKey}>
              <td>{item.taskName} </td>
              <td>
                {item.completedDate} <small>({item.day}) </small>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() =>
                    deleteButtonFromCompletedClickHandler(item.uniqueKey)
                  }
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-danger mb-5"
        onClick={clearAllCompletedTasks}
        hidden={completedTasksArray.length === 0}
      >
        Clear All Completed Tasks
      </button>
    </div>
  );
}

export default CompeletedTableComponent;
