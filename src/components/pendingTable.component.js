import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCheckDouble,
  faThumbsUp,
  faHandsWash,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";

export function PendingTableComponent({
  pendingTasksArray,
  deleteButtonFromPendingClickHandler,
  completeButtonClickHandler,
  editButtonFromPendingClickHandler,
}) {
  return (
    <div>
      <h4 className="upcoming-header">Upcoming Tasks</h4>
      {pendingTasksArray.length === 0 ? (
        <p className="m-5">
          Good Job{" "}
          <FontAwesomeIcon className="text-warning  " icon={faThumbsUp} />{" "}
          <br />
          All tasks are completed{" "}
          <FontAwesomeIcon className="text-warning  " icon={faHandsWash} />
        </p>
      ) : (
        ""
      )}
      <table
        className="table table-sm mt-2 bg-lightOrange"
        hidden={pendingTasksArray.length === 0}
      >
        <thead>
          <tr>
            <th scope="col">TASK NAME</th>
            <th scope="col">DUE DAY</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {pendingTasksArray.map((item) => (
            <tr key={item.uniqueKey}>
              <td>{item.taskName}</td>
              <td>
                {item.remainingDays <= -1 ? (
                  <span className="badge badge-pill badge-danger">
                    {item.remainingDays + " days"} 
                  </span>
                ) : item.remainingDays === 0 ? (
                  <span className=" badge badge-pill badge-primary">Today</span>
                ) : item.remainingDays === 1 ? (
                  <span className=" badge badge-pill  badge-info">
                    Tomorrow
                  </span>
                ) : (
                  <span className=" badge badge-pill  badge-secondary">
                    {item.remainingDays + " days"}
                  </span>
                )}
                <br />
                <small>
                  ({item.day}) {item.completeBy}
                </small>
              </td>
              <td>
                <button
                  type="button"
                  className="btn1 btn-success mr-1"
                  onClick={() => completeButtonClickHandler(item.uniqueKey)}
                >
                  <FontAwesomeIcon icon={faCheckDouble} />
                </button>
                <button
                  type="button"
                  className="btn1 btn-warning mr-1"
                  onClick={() =>
                    editButtonFromPendingClickHandler(item.uniqueKey)
                  }
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button
                  type="button"
                  className="btn1 btn-danger "
                  onClick={() =>
                    deleteButtonFromPendingClickHandler(item.uniqueKey)
                  }
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingTableComponent;
