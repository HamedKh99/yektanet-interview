import React from "react";
import "./FilterForm.css";

function FormItem({ label, name, value, onChange }) {
  return (
    <div className="formItem">
      <label>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} />
    </div>
  );
}

function FilterForm({
  name,
  date,
  field,
  title,
  setName,
  setDate,
  setField,
  setTitle,
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormItem
        label="نام تغییر دهنده:"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <FormItem
        label="تاریخ:"
        name="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <FormItem
        label="نام آگهی:"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <FormItem
        label="فیلد:"
        name="field"
        value={field}
        onChange={(event) => setField(event.target.value)}
      />
    </form>
  );
}

export default FilterForm;
