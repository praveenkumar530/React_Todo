import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DeleteIcon from "@material-ui/icons/Delete";

export function CompeletedTableComponent({
  completedTasksArray,
  deleteButtonFromCompletedClickHandler,
  clearAllCompletedTasks,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (x) => {
    setOpen(false);
  };

  const handleOkay = (x) => {
    setOpen(false);
    clearAllCompletedTasks();
  };

  return (
    <div>
      <h4 className="completed-header ">Completed Tasks</h4>
      {completedTasksArray.length === 0 ? (
        <p className="mt-4">No records found !!</p>
      ) : (
        ""
      )}
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
                  className="btn1 btn-danger mb-2"
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
      
      <Button
        variant="contained"
        color="secondary"
        className="mb-2 shadow"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
        hidden={completedTasksArray.length === 0}
      >
        Clear All Completed Tasks
      </Button>
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
            Are you sure on Clearing all the completed tasks?
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

export default CompeletedTableComponent;
