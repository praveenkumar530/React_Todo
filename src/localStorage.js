export function getLsPendingTasksArray() {
  let getLsPendingTasksArray = localStorage.getItem("getLsPendingTasksArray");
  if (getLsPendingTasksArray) {
    return JSON.parse(getLsPendingTasksArray);
  }
  return [];
}

export function getLsCompletedTasksArray() {
  let getLsCompletedTasksArray = localStorage.getItem(
    "getLsCompletedTasksArray"
  );
  if (getLsCompletedTasksArray) {
    return JSON.parse(getLsCompletedTasksArray);
  }
  return [];
}

export function getCurrentDate() {
  let d = new Date();
  let today =
    d.getFullYear() + "-" + parseInt(d.getMonth() + 1) + "-" + d.getDate();
  return today;
}

export default {
  getLsPendingTasksArray,
  getLsCompletedTasksArray,
  getCurrentDate,
};
