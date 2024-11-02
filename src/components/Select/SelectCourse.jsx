import React from "react";
import { Select } from "antd";
const options = [
    { value: "Maths", label: "Maths" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
    {
        value: "History",
        label: "History",
    },
    {
        value: "Geography",
        label: "Geography",
    },
    {
        value: "Biology",
        label: "Biology",
    }
];

const SelectCourse = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Select
      mode="tags"
      style={{
        width: "100%",
      }}
      placeholder="Tags Mode"
      onChange={handleChange}
      options={options}
    />
  );
};
export default SelectCourse;
