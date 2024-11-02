import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routers from "./routes/Routers";
import LoginRoutes from "./routes/LoginRoutes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function App() {
  const navigate = useNavigate();

  const { data: token } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      return token;
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? (
    <div className="py-6 px-8 flex items-start h-screen">
      <Navbar />
      <div className="px-[72px] w-full h-full">
        <Routers />
      </div>
    </div>
  ) : (
    <LoginRoutes />
  );
}

export default App;