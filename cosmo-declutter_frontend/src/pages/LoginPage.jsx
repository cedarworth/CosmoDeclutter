import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "../providers/UserProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const { setIsAuthenticated, user } = useUser();
  // const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    const fetchUser = async () => {
      try {
        e.preventDefault();

        const res = await axios.post("http://localhost:4000/api/auth/login", {
          email: emailInput,
          password: passwordInput,
        });

        const data = res.data;
        // console.log(data);
        function storeData(key, data) {
          localStorage.setItem(key, JSON.stringify(data));
      }
      
        // localStorage.setItem('poolKey', JSON.stringify(data));
      
        //  setUser(data); // Store only the data returned from the server

        // Display a success message from sweetalert2
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        
        // Navigate to the homepage
        navigate(`/home`);
        setIsAuthenticated(true);
      } catch (err) {
        setError(err.response.data.message);

        // Display an error message from sweetalert2
        Swal.fire({
          title: "Error!",
          text: "Make sure your data are correctly entered.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };
    fetchUser();
  };

  // useEffect(() => {
  //   const saveData = () => {
  //   localStorage.setItem('data', JSON.stringify(data));
  //   };
  //   saveData();
  // }, [data]);

  return (
    <div>
      <Navbar loginPage={true} />
      <img id="log-img1" src="../assets/img-0.png" width="" height=""/>
      {/* <!--Login form--> */}
      <div className="login">
        <h1>Welcome Back to</h1>
        <img
          id="log-img"
          src="../assets/logo_3.png"
          width="auto"
          height="auto"
          alt=""
        />
        <h3>Please Login</h3>
        <p>Kindly fill out the fields with the required information</p>
        {error && <p>{error}</p>} {/*Display error messages*/}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              Enter Your Email:{" "}
              <input
                id="email"
                name="email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </label>
            <label htmlFor="new-password">
              Enter Your Password:{" "}
              <input
                id="new-password"
                name="password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                pattern="[a-z0-5]{8,}"
                required
              />
            </label>
          </fieldset>
          <input onClick={() => {}} type="submit" value="login" />
          <p>
            Not yet registered? Please register <Link to="/register">here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
