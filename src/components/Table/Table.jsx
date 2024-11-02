import React, { useState } from "react";
import { Button, Table, Tag, Input, Select, Pagination } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import ModalWrapper from "../Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../hook/useEnv";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TableDisplay = ({ data, refreshPage, setRefreshPage }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);

  const [editRecord, setEditRecord] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateCourses, setUpdateCourses] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateAge, setUpdateAge] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text || "N/A"}</p>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (age) => age || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => email || "N/A",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => address || "N/A",
    },
    {
      title: data[0]?.isTeacher ? "Subject" : "Courses",
      key: data[0]?.isTeacher ? "Subject" : "Courses",
      dataIndex: data[0]?.isTeacher ? "Subject" : "Courses",
      render: (_, record) => (
        <>
          {record.isTeacher
            ? record.subjects?.map((subject, index) => (
                <Tag color="blue" key={index}>
                  {subject.toUpperCase()}
                </Tag>
              ))
            : record.courses?.map((course, index) => (
                <Tag color="green" key={index}>
                  {course.toUpperCase()}
                </Tag>
              ))}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleMoreRecord(record.id)}
            className="hover:text-blue-500"
          >
            <SolutionOutlined className="text-xl" />
          </button>
          <button
            onClick={() => handleShowUpdate(record)}
            className="hover:text-green-500"
          >
            <EditOutlined className="text-xl" />
          </button>
          <button
            onClick={() => handleShowModal(record)}
            className="hover:text-red-500"
          >
            <DeleteOutlined className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  // Show single data
  const handleMoreRecord = (id) => {
    const singleUser = data.find((item) => item.id === id);
    if (singleUser) {
      navigate(`/${singleUser?.isStudent ? "students" : "teachers"}/${id}`);
      queryClient.invalidateQueries("singlePage");
    }
  };

  // Show delete modal
  const handleShowModal = (record) => {
    setDeleteRecord(record);
    setShowModal(true);
  };

  // Delete logic

  const deletingRecord = async (record) => {
    try {
      return await axios.delete(
        `${URL}/${record?.isTeacher ? "teachers" : "students"}/${record.id}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deletingRecord,
    onSuccess: () => {
      setShowModal(false);
      setDeleteRecord(null);
      queryClient.invalidateQueries(
        `${deleteRecord?.isStudent ? "students" : "teachers"}`
      );
      setRefreshPage(!refreshPage);
    },
  });

  const handleDelete = async (data) => {
    const record = data.find((r) => r.id === deleteRecord.id);
    await deleteMutation.mutateAsync(record);
  };


  const updatingRecord = async (record) => {
    try {
      return await axios.put(
        `${URL}/${editRecord?.isStudent ? "students" : "teachers"}/${editRecord.id}`,
        record
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateMutation = useMutation({
    mutationFn: updatingRecord,
    onSuccess: () => {
      setUpdateModal(false);
      queryClient.invalidateQueries(
        `${editRecord?.isStudent ? "students" : "teachers"}`
      );
      setRefreshPage(!refreshPage);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      name: updateName,
      age: updateAge,
      email: updateEmail,
      address: updateAddress,
    };

    if (editRecord.isTeacher) {
      updateData.subjects = updateCourses;
      updateData.isTeacher = true;
    } else {
      updateData.courses = updateCourses;
      updateData.isStudent = true;
    }
    await updateMutation.mutateAsync(updateData);
  };

  const handleUpdateClose = () => {
    setUpdateModal(false);
  };

  const handleShowUpdate = (record) => {
    setUpdateId(record.id);
    setEditRecord(record);
    setUpdateModal(true);
    setUpdateName(record.name);
    setUpdateAge(record.age);
    setUpdateEmail(record.email);
    setUpdateAddress(record.address);
    setUpdateCourses(record.courses || record.subjects);
  };

  const handleChange = (value) => {
    setUpdateCourses(value);
  };

  const dataSlice = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Table columns={columns} dataSource={dataSlice} pagination={false} />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handlePageChange}
        pageSizeOptions={[5, 10, 20, 50]}
        className="flex justify-end mt-5"
      />
      <ModalWrapper
        open={showModal}
        setOpen={setShowModal}
        handleCancel={handleCancel}
        title={`Delete ${editRecord.isTeacher ? "teacher" : "student"}`}
      >
        <div>
          <p>
            Are you sure you want to delete this{" "}
            {`${editRecord.isTeacher ? "teacher" : "student"}`}?
          </p>
          <div className="flex items-center justify-end space-x-3">
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <Button
              htmlType="submit"
              type="primary"
              danger
              onClick={() => handleDelete(data)}
            >
              Delete
            </Button>
          </div>
        </div>
      </ModalWrapper>
      <ModalWrapper
        open={updateModal}
        setUpdateModal={setUpdateModal}
        handleCancel={handleUpdateClose}
        title={`Update ${editRecord.isTeacher ? "teacher" : "student"}`}
      >
        <div>
          <form onSubmit={handleSubmit} className="p-2" autoComplete="off">
            <div className="mt-2">
              <label>Name:</label>
              <Input
                className="mt-2"
                allowClear
                type="text"
                name="name"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                required
              />
            </div>
            <div className="mt-2">
              <label>Age:</label>
              <Input
                className="mt-2"
                allowClear
                type="number"
                name="age"
                value={updateAge}
                onChange={(e) => setUpdateAge(e.target.value)}
                required
              />
            </div>
            <div className="mt-2">
              <label>Email:</label>
              <Input
                className="mt-2"
                allowClear
                type="email"
                name="email"
                value={updateEmail}
                onChange={(e) => setUpdateEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-2">
              <label>Address:</label>
              <Input
                className="mt-2"
                allowClear
                type="text"
                name="address"
                value={updateAddress}
                onChange={(e) => setUpdateAddress(e.target.value)}
                required
              />
            </div>
            <div className="mt-2">
              <label>
                Choose {editRecord.isTeacher ? "subjects" : "courses"}:
              </label>
              <Select
                className="mt-2 w-full"
                mode="tags"
                placeholder={`Choose ${
                  editRecord.isTeacher ? "subjects" : "courses"
                }`}
                value={updateCourses}
                onChange={handleChange}
                options={options}
              />
            </div>
            <div className="w-full flex items-center justify-end space-x-5 mt-5">
              <button
                type="button"
                className="text-[16px]"
                onClick={handleUpdateClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#000]/20 active:bg-[#000]/30 px-2 rounded text-[16px]"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </ModalWrapper>
    </>
  );
};

export default TableDisplay;
