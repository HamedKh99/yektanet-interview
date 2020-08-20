import React, { useState, useEffect } from "react";
import "./App.css";

import Table from "./components/Table";
import FilterForm from "./components/FilterForm";
import Pagination from "./components/Pagination";
import {constructBST} from "./utils/BST"

function App() {
  const [sortedBy, setSortedBy] = useState(() => {
    let search = window.location.search;
    return new URLSearchParams(search).get("sortedBy");
  });

  const [nameInput, setNameInput] = useState(() => {
    let search = window.location.search;
    return new URLSearchParams(search).get("name");
  });

  const [dateInput, setDateInput] = useState(() => {
    let search = window.location.search;
    return new URLSearchParams(search).get("date");
  });

  const [fieldInput, setFeildInput] = useState(() => {
    let search = window.location.search;
    return new URLSearchParams(search).get("field");
  });

  const [titleInput, setTitleInput] = useState(() => {
    let search = window.location.search;
    return new URLSearchParams(search).get("title");
  });

  const [starredId, setStarredId] = useState(() => {
    return localStorage.getItem("starred")
      ? JSON.parse(localStorage.getItem("starred"))
      : [];
  });

  const [page, setPage] = useState(0);

  const data = require('./data.json')

  const data_bst = constructBST(data)

  useEffect(() => {

    setQueryString();
  });

  const getDataFilteredByDate = () => {
    return (dateInput === null || dateInput === "") ? data : data_bst.search(data_bst.root, dateInput)
  }

  const getFilterdData = () => {
    return getDataFilteredByDate().filter(
      (d) =>
        (nameInput === null || nameInput === ""
          ? true
          : d.name === nameInput) &&
        (titleInput === null || titleInput === ""
          ? true
          : d.title === titleInput) &&
        (fieldInput === null || fieldInput === ""
          ? true
          : d.field === fieldInput)
    );
  };

  const getSortedData = () => {
    let filterData = getFilterdData();
    return sortedBy === null
      ? filterData
      : filterData.sort((a, b) => {
          var x = a[sortedBy];
          var y = b[sortedBy];
          return x < y ? -1 : x > y ? 1 : 0;
        });
  };

  const getPaginatedData = () => {
    let sortedData = getSortedData()
    let end = (page + 1) * 7 > sortedData.length ? sortedData.length : (page + 1) * 7;
    return sortedData.slice(page * 7, end);
  };

  const getQueryStringParams = () => {
    let search = window.location.search;
    return new URLSearchParams(search);
  };

  const setQueryString = () => {
    const params = getQueryStringParams();
    if (sortedBy !== null) params.set("sortedBy", sortedBy); else params.delete("sortedBy");
    if (nameInput !== null && nameInput !== "") params.set("name", nameInput);
    else params.delete("name");
    if (dateInput !== null && dateInput !== "") params.set("date", dateInput);
    else params.delete("date");
    if (titleInput !== null && titleInput !== "")
      params.set("title", titleInput);
    else params.delete("title");
    if (fieldInput !== null && fieldInput !== "")
      params.set("field", fieldInput);
    else params.delete("field");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const handleStar = (id) => {
    let newStarredId;
    if (starredId.includes(id))
      newStarredId = starredId.filter((element) => element !== id);
    else {
      newStarredId = [...starredId];
      newStarredId.push(id);
    }
    localStorage.setItem("starred", JSON.stringify(newStarredId));
    setStarredId(newStarredId);
  };

  return (
    <div className="App">
      <div className="FilterFormContainer">
        <FilterForm
          name={nameInput ? nameInput : ""}
          date={dateInput ? dateInput : ""}
          title={titleInput ? titleInput : ""}
          field={fieldInput ? fieldInput : ""}
          setName={setNameInput}
          setDate={setDateInput}
          setTitle={setTitleInput}
          setField={setFeildInput}
        />
      </div>
      <div className="TableContainer">
        <Table
          setSortedBy={setSortedBy}
          data={getPaginatedData()}
          handleStar={handleStar}
          starredId={starredId}
          sortedBy={sortedBy}
        />
      </div>
      <div className="PaginationContainer">
        <Pagination page={page} setPage={setPage} dataLength={data.length}/>
      </div>
    </div>
  );
}

export default App;
