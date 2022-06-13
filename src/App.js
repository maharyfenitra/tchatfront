import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Room from "./components/Room";
import { useEffect, createContext, useState } from "react";
import {url} from "./utils";
import axios from "axios";
export const AppContext = createContext(null);
function App() {
  const [users,setUsers] = useState();
  useEffect(()=>{
    axios.get(url+"users/getUsers").then(res=>{setUsers(res.data)})
  },[])
  return (
    <AppContext.Provider value={{ users,setUsers }}>
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room" element={<Room />} />
      </Routes>

    </div>
    </AppContext.Provider>
  );
}

export default App;
