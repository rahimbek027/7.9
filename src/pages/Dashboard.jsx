import React from "react";
import DashboardImage from "../assets/images/dashboard-img.png";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const user = JSON.parse(localStorage.getItem("token"));
      return user;
    },
  });
  return (
    <div className="flex items-center h-full w-full justify-center gap-16">
      <div className="w-[60%]">
        <div className="bg-[#F5F5F7] p-4 rounded-lg py-11 relative mt-[30px] px-8">
          <div>
            <h2 className="text-2xl text-center font-bold text-gray-800 capitalize">
              Hello {data?.username}
            </h2>
            <h2 className="text-xl text-center mt-2 font-normal text-gray-800">
              It’s good to see you again.
            </h2>
          </div>
        </div>
        <div className="w-full mt-6"></div>
      </div>
    </div>
  );
};

export default Dashboard;
