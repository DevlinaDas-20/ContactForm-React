import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    uniqueId: ""
  });

  const [ErrorMessage, setErrorMessage] = useState({
    phoneError: "",
    mailError: "",
  });
  let name, value ,uniqueId;
  const getUserDataHandler = (e) => {
    name = e.target.name;
    value = e.target.value;
    uniqueId = 'uniqueId';
    setUserData({ ...userData, [name]: value, [uniqueId]: new Date().getTime().toString() });

    if (name == "name") {
      if (!value.match(/^[a-zA-Z ]+$/)) {
        setErrorMessage({...ErrorMessage,['nameError']:'Enter Alphabets Only'});
      } else {
        setErrorMessage({...ErrorMessage,['nameError']:''});
      }
    }
    if (name == "phone") {
      if (!value.match(/^[0-9]+$/)) {
        setErrorMessage({...ErrorMessage,['phoneError']:'Enter Numbers Only'});
      } else {
        setErrorMessage({...ErrorMessage,['phoneError']:''});
      }
    }
    if (name == "email") {
      if (!value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) {
        setErrorMessage({...ErrorMessage,['mailError']:'Enter in valid email format'});
      } else {
        setErrorMessage({...ErrorMessage,['mailError']:''});
      }
    }
  };

  const submitUserDataHandler = async (e) => {
    console.log({ userData });
    e.preventDefault();

    const { name, email, phone, address, message, uniqueId } = userData;
    const { nameError, phoneError, mailError} = ErrorMessage;

    if(name && email && phone && address && message && nameError.length < 1 && phoneError.length < 1 && mailError.length < 1 ){
    const res = await fetch(
      "https://react-contactform-dev-default-rtdb.firebaseio.com/contactForm.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, address, message, uniqueId }),
      }
    );
    console.log(res);
    if (res) {
      setUserData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
        uniqueId: ""
      });
      alert("Data Sent to FIRE-BASE 🔥");
    } else {
      alert("💔 UNABLE to send Data to FIRE-BASE 🔥");
    }
  }else{
    alert('ENTER ALL DATA CORRECTLY!')
  }
  };

  return (
    <div className="container">
      <div className="content">
        <div className="right-side">
          <div className="topic-text">Send us a message</div>
          <p>
            Please Provide your details in order for us to Contact you!
          </p>
          <form action="#" method="POST">
            <div className="input-box">
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={getUserDataHandler}
                placeholder="Enter your name"
                required
              />
              <span className="error">{ErrorMessage['nameError']}</span>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={getUserDataHandler}
                placeholder="Enter your email"
                required
              />
              <span className="error">{ErrorMessage['mailError']}</span>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={getUserDataHandler}
                placeholder="Enter your Phone Number"
                required
              />
              <span className="error">{ErrorMessage['phoneError']}</span>
            </div>
            <div className="input-box">
              <textarea
                type="text"
                name="address"
                value={userData.address}
                onChange={getUserDataHandler}
                placeholder="Enter your address"
                rows="5"
                required
              />
            </div>
            <div className="input-box">
              <textarea
                type="text"
                name="message"
                value={userData.message}
                onChange={getUserDataHandler}
                placeholder="Enter your message"
                rows="10"
                required
              />
            </div>
            <div className="button">
              <input
                type="submit"
                value="Send Now"
                onClick={submitUserDataHandler}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
