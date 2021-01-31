import "./App.css";
import { useState, useEffect } from "react";
import { CompeletedTableComponent } from "./components/compeletedTable.component";
import { InputControlsComponent } from "./components/inputControls.component";
import { PendingTableComponent } from "./components/pendingTable.component";
import {
  getLsPendingTasksArray,
  getLsCompletedTasksArray,
} from "./localStorage";
import HeaderComponent from "./components/header.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [taskName, setTaskName] = useState("");
  // current date function is useless
  const [taskDate, setTaskDate] = useState("");
  const [pendingTasksArray, setPendingTasksArray] = useState(
    getLsPendingTasksArray
  );

  const [completedTasksArray, setCompletedTasksArray] = useState(
    getLsCompletedTasksArray
  );

  const [editUniqKey, setEditUniqKey] = useState(0);

  useEffect(() => {
    updateRemainingDaysForOlderTasks();

    setTaskDate(getDefalutDate());
  }, []);

  function getDefalutDate() {
    let t = new Date();
    let month = (t.getMonth() + 1).toString();
    month = month.length == 1 ? "0" + month : month;
    return `${t.getFullYear()}-${month}-${t.getDate()}`;
  }

  function updateRemainingDaysForOlderTasks() {
    let newPendingTasksArray = pendingTasksArray.map(function (item) {
      let newItem = { ...item };
      let dateObj = new Date(item.taskDueDate);
      newItem.remainingDays = remainingDaysCalculator(dateObj);
      return newItem;
    });

    setPendingTasksArray(newPendingTasksArray);
    localStorage.setItem(
      "getLsPendingTasksArray",
      JSON.stringify(newPendingTasksArray)
    );
  }

  function submitHandler(e) {
    //Unique key for storing the data in rows
    let uniqueKey = Math.floor(
      window.performance.now() + window.performance.timeOrigin
    );

    let isComplete = false;

    //method reuse and copying to completBy date
    let { completedDate, day } = getDayFormat(
      new Date(taskDate).toDateString()
    );

    let taskDueDate = new Date(taskDate);

    let remainingDays = remainingDaysCalculator(taskDueDate);
    let completeBy = completedDate;
    let newPendingTasksArray = [
      ...pendingTasksArray,
      {
        uniqueKey,
        taskName,
        taskDueDate,
        completeBy,
        remainingDays,
        day,
        isComplete,
      },
    ];

    //Sorting all the expenses by descending order i.e wrt latest item
    newPendingTasksArray.sort((x, y) => x.remainingDays - y.remainingDays);
    setPendingTasksArray(newPendingTasksArray);

    localStorage.setItem(
      "getLsPendingTasksArray",
      JSON.stringify(newPendingTasksArray)
    );
    setTaskName("");
    setTaskDate(getDefalutDate());
    toast.success(`Task "${taskName}" added successfully!`, {
      autoClose: 2000,
    });
    e.preventDefault();
  }

  function getDayFormat(today) {
    //Complete day calculation
    let dateArray = today.split(" ");

    let completedDate = `${parseInt(dateArray[2])}-${
      dateArray[1]
    }-${dateArray[3].slice(2, 4)}`;
    let day = dateArray[0].toLowerCase();
    return { completedDate, day };
  }

  // a is passing Date objects
  function remainingDaysCalculator(a) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let b = new Date();
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  }

  function completeButtonClickHandler(completedKey) {
    let completableItem = pendingTasksArray.filter(
      (item) => item.uniqueKey === completedKey
    )[0];

    // Complete code
    completableItem.isComplete = true;

    //Complete day calculation
    let { completedDate, day } = getDayFormat(new Date().toDateString());

    completableItem.completedDate = completedDate;
    completableItem.day = day;

    deleteAnItemFromPendingArrayByIndexKey(completedKey);

    let newCompletedTasksArray = [completableItem, ...completedTasksArray];
    setCompletedTasksArray(newCompletedTasksArray);
    localStorage.setItem(
      "getLsCompletedTasksArray",
      JSON.stringify(newCompletedTasksArray)
    );
    toast.success(
      `Task "${completableItem.taskName}" completed successfully!`,
      {
        autoClose: 2000,
      }
    );
  }

  function deleteButtonFromPendingClickHandler(deletingKey) {
    let deletableItem = pendingTasksArray.filter(
      (item) => item.uniqueKey === deletingKey
    )[0];

    if (deletingKey === editUniqKey) {
      setEditUniqKey(0);
      setTaskDate(getDefalutDate());
      setTaskName("");
    }
    toast(`Task "${deletableItem.taskName}" deleted!`, {
      autoClose: 2000,
    });
    deleteAnItemFromPendingArrayByIndexKey(deletingKey);
  }

  function deleteAnItemFromPendingArrayByIndexKey(deletingKey) {
    let newPendingTasksArray = pendingTasksArray.filter(
      (item) => item.uniqueKey !== deletingKey
    );

    setPendingTasksArray(newPendingTasksArray);
    localStorage.setItem(
      "getLsPendingTasksArray",
      JSON.stringify(newPendingTasksArray)
    );
  }

  function deleteButtonFromCompletedClickHandler(deletingKey) {
    let deletedItem = completedTasksArray.filter(
      (item) => item.uniqueKey === deletingKey
    )[0];

    let newCompletedTasksArray = completedTasksArray.filter(
      (item) => item.uniqueKey !== deletingKey
    );

    setCompletedTasksArray(newCompletedTasksArray);
    localStorage.setItem(
      "getLsCompletedTasksArray",
      JSON.stringify(newCompletedTasksArray)
    );
    toast(`Task "${deletedItem.taskName}" has been deleted!`, {
      autoClose: 2000,
    });
  }

  function clearAllCompletedTasks() {
    setCompletedTasksArray([]);
    localStorage.setItem("getLsCompletedTasksArray", []);
    toast("All the completed Tasks have been cleared!", { autoClose: 2000 });
  }

  function editButtonFromPendingClickHandler(editKey) {
    let editableItem = pendingTasksArray.filter(
      (item) => item.uniqueKey === editKey
    )[0];
    setTaskName(editableItem.taskName);
    let d = new Date(editableItem.taskDueDate);
    let year = d.getFullYear().toString();
    let month = 1 + d.getMonth();
    month =
      month.toString().length < 2 ? "0" + month.toString() : month.toString();
    let date = d.getDate();
    date = date.toString().length < 2 ? "0" + date.toString() : date.toString();
    setTaskDate(year + "-" + month + "-" + date);
    setEditUniqKey(editKey);
  }

  function cancelEditHandler(e) {
    setEditUniqKey(0);
    setTaskName("");
    setTaskDate(getDefalutDate());
    e.preventDefault();
  }

  function saveEditedChangesHandler(e) {
    //method reuse and copying to completBy date
    let { completedDate, day } = getDayFormat(
      new Date(taskDate).toDateString()
    );

    let taskDueDate = new Date(taskDate);

    let remainingDays = remainingDaysCalculator(taskDueDate);
    let completeBy = completedDate;

    //update the existing record with new details ( edited )
    let newPendingTasksArray = pendingTasksArray;
    let objIndex = newPendingTasksArray.findIndex(
      (item) => item.uniqueKey === editUniqKey
    );
    let oldTaskName = newPendingTasksArray[objIndex].taskName;

    //Update object's name property.
    newPendingTasksArray[objIndex].taskName = taskName;
    newPendingTasksArray[objIndex].completeBy = completeBy;
    newPendingTasksArray[objIndex].taskDueDate = taskDueDate;
    newPendingTasksArray[objIndex].day = day;
    newPendingTasksArray[objIndex].remainingDays = remainingDays;

    //Sorting all the expenses by descending order i.e wrt latest item
    newPendingTasksArray.sort((x, y) => x.remainingDays - y.remainingDays);
    setPendingTasksArray(newPendingTasksArray);

    localStorage.setItem(
      "getLsPendingTasksArray",
      JSON.stringify(newPendingTasksArray)
    );

    setEditUniqKey(0);
    setTaskName("");
    setTaskDate(getDefalutDate());
    toast.success(
      `Task "${oldTaskName}" updated to "${newPendingTasksArray[objIndex].taskName}" successfully`,
      { autoClose: 3000 }
    );
    e.preventDefault();
  }

  return (
    <div className="App container">
      <HeaderComponent />
      <ToastContainer />
      <InputControlsComponent
        className=" "
        taskName={taskName}
        setTaskName={setTaskName}
        taskDate={taskDate}
        setTaskDate={setTaskDate}
        submitHandler={submitHandler}
        editUniqKey={editUniqKey}
        cancelEditHandler={cancelEditHandler}
        saveEditedChangesHandler={saveEditedChangesHandler}
      />

      <PendingTableComponent
        pendingTasksArray={pendingTasksArray}
        completeButtonClickHandler={completeButtonClickHandler}
        deleteButtonFromPendingClickHandler={
          deleteButtonFromPendingClickHandler
        }
        editButtonFromPendingClickHandler={editButtonFromPendingClickHandler}
      />
      <CompeletedTableComponent
        completedTasksArray={completedTasksArray}
        deleteButtonFromCompletedClickHandler={
          deleteButtonFromCompletedClickHandler
        }
        clearAllCompletedTasks={clearAllCompletedTasks}
      />
    </div>
  );
}

export default App;
