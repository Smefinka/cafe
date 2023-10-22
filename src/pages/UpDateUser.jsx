import React from "react";
import { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database";
import { database } from "/src/API/firebase";
import { useDispatch } from 'react-redux';
import { getUserFromDB } from '../store/userSlice';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { getAuth, updateProfile } from "firebase/auth";

function UpDateUser() {
   const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [cart, setCart] = useState(user.cart);
  const user1 = useSelector(state => state.user)
  
console.log(user1.userId);

  useEffect(() => {
    const userRef = ref(database, `users/${user1.userId}`);


    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log(userData);
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
      }
    });
  }, [user1.userId]);


  const handleSave = () => {

    const userRef = ref(database, `users/${user1.userId}`);
    const updateData = {
      name: name,
      email: email,
      cart: []
    };
    console.log(updateData)
    update(userRef, updateData)
      .then(() => {
        if (user1.userId) {
          console.log(user1.userId);
          dispatch(getUserFromDB(user1.userId));
        }
        console.log("Дані оновлено.");
      })
      .catch((error) => {
        console.error("Помилка під час оновлення даних:", error);
      });
  };
  return (

    <>
    <Container className='m-5'>
            <Row className='justify-content-center'>
                <Col sm={8} md={6}>

      <h2>Edit User</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </ Col>
    </ Row>
    </ Container>
   </>
  );
}

export default UpDateUser;
