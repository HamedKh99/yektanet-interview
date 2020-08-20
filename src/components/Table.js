import React from "react";
import "./Table.css";

function Table({ data, setSortedBy, handleStar, starredId, sortedBy }) {
  return (
    <table>
      <thead>
        <tr>
          <th
            style={{
              backgroundColor: sortedBy === "name" ? "#6b8f76" : undefined,
            }}
            onClick={() =>
              sortedBy === "name" ? setSortedBy(null) : setSortedBy("name")
            }
          >
            نام تغییر دهنده
          </th>
          <th
            style={{
              backgroundColor: sortedBy === "date" ? "#6b8f76" : undefined,
            }}
            onClick={() =>
              sortedBy === "date" ? setSortedBy(null) : setSortedBy("date")
            }
          >
            تاریخ
          </th>
          <th
            style={{
              backgroundColor: sortedBy === "title" ? "#6b8f76" : undefined,
            }}
            onClick={() =>
              sortedBy === "title" ? setSortedBy(null) : setSortedBy("title")
            }
          >
            نام آگهی
          </th>
          <th
            style={{
              backgroundColor: sortedBy === "field" ? "#6b8f76" : undefined,
            }}
            onClick={() =>
              sortedBy === "field" ? setSortedBy(null) : setSortedBy("field")
            }
          >
            فیلد
          </th>
          <th>مقدار قدیمی</th>
          <th>مقدار جدید</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => {
          return (
            <tr
              onClick={() => handleStar(d.id)}
              style={{
                backgroundColor: starredId.includes(d.id)
                  ? "#ebc663"
                  : undefined,
              }}
              key={d.id}
            >
              <td>{d.name}</td>
              <td>{d.date}</td>
              <td>{d.title}</td>
              <td>{d.field}</td>
              <td>{d.old_value}</td>
              <td>{d.new_value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
