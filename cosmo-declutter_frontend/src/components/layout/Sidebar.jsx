import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../../styles.css";
import { useUser } from "../../providers/UserProvider";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser, isAuthenticated } = useUser();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navigation">
      {isOpen ? (
        <i onClick={toggleSidebar} id="close" className="bi bi-x-lg"></i>
      ) : (
        <i onClick={toggleSidebar} id="open" className="bi bi-list"></i>
      )}

      <div className={`sidebar ${isOpen ? "open" : "close"}`}>
        {isAuthenticated ? (
          <>
          <Link to="/profile" >
              <p>Profile</p>
            </Link>
          <Link to="/login" onClick={()=>{setUser(null); localStorage.removeItem("cosmo-token")}}>
            <p>Logout</p>
          </Link>
          </>
        ) : (
          <>
            <Link to='/login'>
              <p>Login</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
