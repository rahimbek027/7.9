import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loaging/Loading";
import { LeftCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { URL } from "../hook/useEnv";

const SinglePage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isStudent = location.pathname.includes("/students/");

  const { data = [] } = useQuery({
    queryKey: ["singlePage"],
    queryFn: async () => {
      const response = await fetch(
        `${URL}/${isStudent ? "students" : "teachers"}/${id}`
      );
      const data = await response.json();
      setTimeout(() => {
        setLoading(false);
      }, 100);
      return data;
    },
  });

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div>
      <button onClick={() => navigate(-1)}>
        <LeftCircleOutlined className="text-[30px]" />
      </button>
      <div className="flex items-start space-x-10 mt-10">
        <div className="bg-[#F5F5F7] rounded-lg py-11 px-8">
          <h1>{data.name}</h1>
          <p>Age: {data.age}</p>
          <p>Email: {data.email}</p>
          <p>Address: {data.address}</p>
          <p>
            Courses:{" "}
            {data.isTeacher
              ? data.subjects.join(", ")
              : data.courses.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
