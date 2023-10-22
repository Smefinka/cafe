import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch } from "react-redux";
import { auth } from "/src/API/firebase";
import { userActions } from "../store";
import { useParams } from "react-router-dom";
import {useNavigate } from "react-router-dom";


function UserLogOut({user}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user.userId);

    const handleLogout = () => {
      auth.signOut()
      .then(() => {
          console.log('signout');
          dispatch(userActions.logout());
      })
      .catch((error) => {
          console.log(error);
      });
    };

    const handleEditUser = () => {

      dispatch(userActions.updateUser(user));
      navigate('/update'); 

    };
    
  return (
    <div>
      <NavDropdown title="User Page" id="basic-nav-user">
      <NavDropdown.Header>Welcome, {user.name}!</NavDropdown.Header>
      <NavDropdown.Item  onClick={handleEditUser} >UpDate</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#" onClick={handleLogout}>LogOut</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}

export default UserLogOut;
