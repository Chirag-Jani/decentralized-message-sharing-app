import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importing components
import Navbar from "./Components/Navbar";
import ContractInfo from "./Components/ContractInfo";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import News from "./Components/News";
import Member from "./Components/Member";

function App() {
  return (
    <div>
      {/* <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ContractInfo />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/member" element={<Member />}></Route>
        </Routes>
      </Router> */}
      <Member />
    </div>
  );
}

export default App;
