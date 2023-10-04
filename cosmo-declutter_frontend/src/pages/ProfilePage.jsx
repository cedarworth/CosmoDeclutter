import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "../styles.css";
import Navbar from "../components/layout/Navbar";
import { useUser } from "../providers/UserProvider";
import { PiSealWarningFill } from "react-icons/pi";
// import LoginPage from "./LoginPage";

function ProfilePage() {
  // const [navigate] = useNavigate();
  const { user } = useUser();
  const [userItem, setUserItem] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const [errorObj, setErrorObj] = useState({
    imageError: "",
    nameError: "",
    descriptionError: "",
    priceError: "",
    locationError: "",
  });

  function retrieveData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

  const [data, setData] = useState(null);

    useEffect(() => {
        const storedData = retrieveData('myKey');
        if (storedData) {
            setData(storedData);
        }
    }, []);

  // console.log(user);

  // const [items, setItems] = useState([]);


    // let basket = JSON.parse(localStorage.getItem('data'));
    // let storedUser = basket.map((x) => { return basket[2].user});
    // console.log(storedUser);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValiation = () => {
    let imageError = "";
    let nameError = "";
    let descriptionError = "";
    let priceError = "";
    let locationError = "";

    if (!userItem.name) {
      nameError = "Please enter a name";
    } else if (userItem.name.length < 3) {
      nameError = "Name must be at least 3 characters long";
    }
    if (!userItem.description) {
      descriptionError = "Please enter a description";
    } else if (userItem.description.length < 5) {
      descriptionError = "Description must be at least 5 characters long";
    }
    if (!userItem.price) {
      priceError = "Please enter a price";
    } else if (userItem.price < 0) {
      priceError = "Price must be a positive number";
    }
    if (!userItem.location) {
      locationError = "Please enter a location";
    } else if (userItem.location.length < 3) {
      locationError = "Location must be at least 3 characters long";
    }
    if (
      imageError ||
      nameError ||
      descriptionError ||
      priceError ||
      locationError
    ) {
      setErrorObj((prevState) => ({
        ...prevState,
        imageError,
        nameError,
        descriptionError,
        priceError,
        locationError,
      }));
      return false;
    }
    setErrorObj((prevState) => ({
      ...prevState,
      imageError,
      nameError,
      descriptionError,
      priceError,
      locationError,
    }));
    return true;
  };

  const handleImageUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      setSelectedFile(e.target.files[0]);
      setErrorObj((prevState) => ({
        ...prevState,
        imageError: "",
      }));
    } else {
      // setSelectedFile(undefined)
      setErrorObj((prevState) => ({
        ...prevState,
        imageError: "Please upload a valid image file",
      }));
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    const valid = handleValiation();
    if (!valid) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", userItem.name);
    formData.append("description", userItem.description);
    formData.append("price", userItem.price);
    formData.append("location", userItem.location);

    axios
      .post("http://localhost:4000/api/product/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar />
      {/* {Object.keys(user) < 1 ? (
        "Loading..." 
      ) : ( */}
        <>
          <div className="user-profile">
            <h2>{`${user.storedData}'s Declutter Corner`}</h2>
            <h3>You can upload an Item for sale here:</h3>
            <form onSubmit={onSubmit} encType="multipart/form-data">
              <label>
                Image:
                <input type="file" onChange={handleImageUpload} name="image" />
                {/* {userItem.image && <img src={userItem.image} alt="Preview" />} */}
              </label>
              {errorObj.imageError && (
                <span className="error">
                  <PiSealWarningFill />
                  {errorObj.imageError}
                </span>
              )}
              {/* Other form fields */}
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={userItem.name}
                  onChange={handleChange}
                />
              </label>
              {errorObj.nameError && (
                <span className="error">
                  <PiSealWarningFill />
                  {errorObj.nameError}
                </span>
              )}
              <label>
                Description:
                <textarea
                  name="description"
                  value={userItem.description}
                  onChange={handleChange}
                />
              </label>
              {errorObj.descriptionError && (
                <span className="error">
                  <PiSealWarningFill />
                  {errorObj.descriptionError}
                </span>
              )}
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={userItem.price}
                  onChange={handleChange}
                />
              </label>
              {errorObj.priceError && (
                <span className="error">
                  <PiSealWarningFill />
                  {errorObj.priceError}
                </span>
              )}
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={userItem.location}
                  onChange={handleChange}
                />
              </label>
              {errorObj.locationError && (
                <span className="error">
                  <PiSealWarningFill />
                  {errorObj.locationError}
                </span>
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
          {/* <button type="submit">Submit</button> */}
        </>
      {/* ) */}
    </>
  );
}
export default ProfilePage;
