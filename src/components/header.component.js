import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

function HeaderComponent({ refToHeader }) {
  return (
    <header ref={refToHeader} className="App-header ">
      <FontAwesomeIcon icon={faClipboardList} /> TODO
    </header>
  );
}

export default HeaderComponent;
