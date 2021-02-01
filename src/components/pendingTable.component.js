import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCheckDouble,
  faThumbsUp,
  faHandsWash,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import React, { useState } from "react";

export function PendingTableComponent({
  pendingTasksArray,
  deleteButtonFromPendingClickHandler,
  completeButtonClickHandler,
  editButtonFromPendingClickHandler,
}) {
  const [open, setOpen] = useState(false);
  const [uniqueKey, setUniqueKey] = useState(0);
  const [triggerComplete, setTriggerComplete] = useState(true);
  const [
    showEditableOrDeletableTaskName,
    setShowEditableOrDeletableTaskName,
  ] = useState("");

  const handleClickOpen = (deletableOrEditableUniqueKey, isComplete) => {
    setOpen(true);
    let deletableOrEditableItem = pendingTasksArray.filter(
      (item) => item.uniqueKey === deletableOrEditableUniqueKey
    )[0];
    if (isComplete) {
      setTriggerComplete(true);
      setShowEditableOrDeletableTaskName(
        `Are you sure you want to complete the task "${deletableOrEditableItem.taskName}"?`
      );
    } else {
      setTriggerComplete(false);
      setShowEditableOrDeletableTaskName(
        `Are you sure you want to delete the task "${deletableOrEditableItem.taskName}"?`
      );
    }
    setUniqueKey(deletableOrEditableUniqueKey);
  };

  const handleClose = (x) => {
    setOpen(false);
  };

  const handleOkay = (x) => {
    setOpen(false);
    if (triggerComplete) {
      completeButtonClickHandler(uniqueKey);
    } else {
      deleteButtonFromPendingClickHandler(uniqueKey);
    }
  };

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
        className="table table-sm  bg-lightOrange"
        hidden={pendingTasksArray.length === 0}
      >
        <thead>
          <tr>
            <th scope="col">TASK NAME</th>
            <th scope="col">DUE DAY</th>
            <th scope="col">ACTIONS</th>
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
                  onClick={() =>
                    handleClickOpen(item.uniqueKey, true)
                  }
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
                    handleClickOpen(item.uniqueKey, false)
                  }
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "WindowFrame",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent>
          <DialogContentText>
            {showEditableOrDeletableTaskName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOkay} variant="outlined" color="secondary">
            Okay
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PendingTableComponent;
