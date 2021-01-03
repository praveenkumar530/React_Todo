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

  useEffect(() => {
    updateRemainingDaysForOlderTasks();
  }, []);

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
    setTaskDate("1");
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
    // Complete code
    let completedTaks = pendingTasksArray.filter(
      (item) => item.uniqueKey === completedKey
    )[0];
    completedTaks.isComplete = true;

    //Complete day calculation
    let { completedDate, day } = getDayFormat(new Date().toDateString());

    completedTaks.completedDate = completedDate;
    completedTaks.day = day;

    deleteButtonFromPendingClickHandler(completedKey);

    let newCompletedTasksArray = [completedTaks, ...completedTasksArray];
    setCompletedTasksArray(newCompletedTasksArray);
    localStorage.setItem(
      "getLsCompletedTasksArray",
      JSON.stringify(newCompletedTasksArray)
    );
  }

  function deleteButtonFromPendingClickHandler(deletingKey) {
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
    let newCompletedTasksArray = completedTasksArray.filter(
      (item) => item.uniqueKey !== deletingKey
    );

    setCompletedTasksArray(newCompletedTasksArray);
    localStorage.setItem(
      "getLsCompletedTasksArray",
      JSON.stringify(newCompletedTasksArray)
    );
  }

  function clearAllCompletedTasks() {
    setCompletedTasksArray([]);
    localStorage.setItem("getLsCompletedTasksArray", []);
  }

  return (
    <div className="App container">
      <HeaderComponent />
      <InputControlsComponent
        className=" "
        taskName={taskName}
        setTaskName={setTaskName}
        taskDate={taskDate}
        setTaskDate={setTaskDate}
        submitHandler={submitHandler}
      />

      <PendingTableComponent
        pendingTasksArray={pendingTasksArray}
        completeButtonClickHandler={completeButtonClickHandler}
        deleteButtonFromPendingClickHandler={
          deleteButtonFromPendingClickHandler
        }
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
