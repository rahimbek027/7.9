import React, { useEffect, useState } from "react";
import TableDisplay from "../components/Table/Table";
import Loading from "../components/Loaging/Loading";
import ModalWrapper from "../components/Modal/Modal";
import { Input, Select } from "antd";
import NoData from "../components/Empty/Empty";
import { URL } from "../hook/useEnv";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Students = () => {
  const queryCLient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [courses, setCourses] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    courses,
    isStudent: true,
  });

  async function fetchStudents() {
    try {
      const response = await axios.get(`${URL}/students`);
      const allStudents = response.data.map((student, index) => {
        student.key = index + 1;
        return student;
      });
      return allStudents;
    } catch (error) {
      console.error(error);
    }
  }

  const { data = [] } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const addStudent = async (newStudent) => {
    try {
      const response = await axios.post(`${URL}/students`, newStudent);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const mutation = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryCLient.invalidateQueries("students");
      setRefreshPage(!refreshPage);
      setShowModal(false);
      setNewStudent({
        name: "",
        age: "",
        email: "",
        address: "",
        courses: [],
        isStudent: true,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await mutation.mutateAsync(newStudent);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setShowModal(false);
    setCourses([]);
    setNewStudent({ name: "", age: "", email: "", address: "", courses: [] });
  };

  // Choose courses
  const options = [
    { value: "Maths", label: "Maths" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Biology", label: "Biology" },
  ];

  const handleChange = (value) => {
    setNewStudent((prevState) => ({
      ...prevState,
      courses: value,
    }));
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between my-5">
        <h1 className="text-sxl font-semibold">people list</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-300 px-4 rounded py-1 font-semibold active:bg-green-500"
        >
          Add people
        </button>
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : data.length > 0 ? (
          <TableDisplay
            data={data}
            refreshPage={refreshPage}
            setRefreshPage={setRefreshPage}
          />
        ) : (
          <div className="w-full text-center">
            <NoData />
          </div>
        )}
      </div>
      <ModalWrapper
        open={showModal}
        setOpen={setShowModal}
        title={"Add Student"}
        handleCancel={handleCancel}
      >
        <div>
          <form onSubmit={handleSubmit} className="p-2" autoComplete="off">
            <div className="mt-2">
              <label> Name:</label>
              <Input
                className="mt-2"
                allowClear
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label> Age:</label>
              <Input
                className="mt-2"
                allowClear
                type="number"
                name="age"
                value={newStudent.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label> Email:</label>
              <Input
                className="mt-2"
                allowClear
                type="email"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label> Address:</label>
              <Input
                className="mt-2"
                allowClear
                type="text"
                name="address"
                value={newStudent.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full flex items-center justify-end space-x-5 mt-5">
              <button
                type="button"
                className="text-[16px] bg-red-300 active:bg-red-500 px-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-300 active:bg-blue-500 px-2 rounded text-[16px]"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default Students;
