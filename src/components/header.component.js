import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

function HeaderComponent() {
  return (
    <header className="App-header ">
     <FontAwesomeIcon icon={faClipboardList} /> TODO
    </header>
  );
}

export default HeaderComponent;
