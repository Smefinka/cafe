import React from "react";
import Form from "react-bootstrap/Form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "/src/API/firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/";
import { ref, set } from "firebase/database";
import { database } from "/src/API/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
//valid
const validate = (values) => {
  const errors = {};
  if (!values.name || values.name.trim() === "") {
    errors.name = "Name is Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }
  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is Required";
  }
  if (!values.password || values.password.trim() === "") {
    errors.password = "Password is Required";
  }
  return errors;
};

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSignUp = (e) => {
    e.preventDefault();

    const validErrors = validate({ name, email, password });
    setErrors(validErrors);
    if (Object.keys(validErrors).length === 0) {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          console.log(database);
          set(ref(database, "users/" + user.uid), {
            name: name,
            email: email,
            userId: user.uid,
            orders: [],
            cart: "",
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
          });
          dispatch(
            userActions.setActiveUser({
              name: name,
              email: email,
              userId: user.uid,
              orders: [],
              cart: "",
            })
          );
          updateProfile(auth.currentUser, {
            displayName: name
          })
        .then(() => {
          toast.success(`Welcome back, ${user.displayName} 😃!`);
          console.log('Profile updated');
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error('Sorry, its error 😒');
          console.log(errorMessage);
      });
      // 4. navigate to Home page
      navigate('/');
  })
        }
    }
  
  return (
    <Form onSubmit={handleSignUp}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setName(e.target.value)}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <button className="sing">Sign Up</button>
    </Form>
  );
}

export default SignUp;
