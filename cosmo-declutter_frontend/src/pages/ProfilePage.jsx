import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "../styles.css";
import Navbar from "../components/layout/Navbar";
import { useUser } from "../providers/UserProvider";
import { PiSealWarningFill } from "react-icons/pi";
import {
  Dialog,
  DialogTrigger,
  Heading,
  Divider,
  Content,
  ButtonGroup,
  Button,
  ActionButton,
} from "@adobe/react-spectrum";
import Swal from "sweetalert2";

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

  console.log(user);

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

  const handleValidation = () => {
    let errors = {};

    if (!userItem.name) {
      errors.name = "Please enter a name";
    } else if (userItem.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }
    if (!userItem.description) {
      errors.description = "Please enter a description";
    } else if (userItem.description.length < 5) {
      errors.description = "Description must be at least 5 characters long";
    }
    if (!userItem.price) {
      errors.price = "Please enter a price";
    } else if (userItem.price < 0) {
      errors.price = "Price must be a positive number";
    }
    if (!userItem.location) {
      errors.location = "Please enter a location";
    } else if (userItem.location.length < 3) {
      errors.location = "Location must be at least 3 characters long";
    }
    if (Object.keys(errors).length > 0) {
      setErrorObj((prevState) => ({
        ...prevState,
        nameError: errors.name,
        descriptionError: errors.description,
        priceError: errors.price,
        locationError: errors.location,
      }));
      return false;
    } else
      setErrorObj((prevState) => ({
        ...prevState,
        nameError: "",
        descriptionError: "",
        priceError: "",
        locationError: "",
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

  const onSubmit = (close) => {
    const valid = handleValidation();
    if (!valid) return;
    
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", userItem.name);
    formData.append("description", userItem.description);
    formData.append("price", userItem.price);
    formData.append("location", userItem.location);

    console.log(Object.fromEntries(formData.entries()));
    const token = localStorage.getItem("cosmo-token");
    axios
      .post("https://cosmodeclutter-api.onrender.com/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);

        // Display a success message
        Swal.fire({
          title: "Success!",
          text: "Your item has been uploaded successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        close();
      })
      .catch((error) => {
        console.error(error);
        // Display an error message
        Swal.fire({
          title: "Error!",
          text: "Your item was not uploaded. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <>
      <Navbar />
      {user === null ? (
        "Loading..." 
      ) : (
      <>
        <div className="user-profile">
          <h2>{`${user?.name}'s Declutter Corner`}</h2>
          <div className="image-box">
            <img
              src={user?.image}
              alt="user"
              width="200px"
              height="200px"
              className="profile-img"
            />
          </div>
          {/* <h3>You can upload an Item for sale here:</h3> */}
        </div>
        <DialogTrigger>
          <Button variant="primary" style="fill" UNSAFE_className="" >Upload Product</Button>
          {(close) => (
            <Dialog>
              <Heading>Upload Product</Heading>
              <Divider />
              <Content>
                <div className="product-upload-ctn">
                  <form onSubmit={onSubmit} encType="multipart/form-data">
                    <label>
                      Image:
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        name="image"
                      />
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
                    {/* <button className="reg-btn" type="submit">
                      Submit
                    </button> */}
                  </form>
                </div>
              </Content>
              <ButtonGroup>
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button
                  variant="accent"
                  onPress={() => {
                    onSubmit(close);
                  }}
                  autoFocus
                >
                  Confirm
                </Button>
              </ButtonGroup>
            </Dialog>
          )}
        </DialogTrigger>
      </>
      )}
    </>
  );
}
export default ProfilePage;
