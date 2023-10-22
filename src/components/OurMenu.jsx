import React, { useEffect, useState } from "react";
import DeliciousPizza from "../images/f1.png";
import allProducts from "../API/fetch-products";
import Product from "./Product";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {productsActions} from '../store/index'

function OurMenu() {
  let buttonView = false;
  const dispatch = useDispatch();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("*");
  if (location.pathname === "/") {
    buttonView = true;
  }
  const [products, setProducts] = useState([]);
  const [productsType, setProductsType] = useState([]);
  useEffect(() => {
    let dowloadingProducts = false;
    async function hej() {
      let products1 = await allProducts();
      setProducts(products1);
      addProducts(products1);
      setProductsType(products1);
      
    }

    if (!dowloadingProducts) {
      hej();
      dowloadingProducts = true;
    }
  }, []);

  function addProducts(products) {
    const allProducts2 = Object.values(products).flatMap((product) =>
      Object.values(product)
    );
    setProducts(allProducts2);
    dispatch(productsActions.installValue(allProducts2));
   
  }

  function handleOnclick(e, filter) {
    setActiveItem(filter);
    const nameFilter = filter.toLowerCase();
    let newOne;
    for (const key in productsType) {
      if (key === nameFilter) {
        newOne = Object.values(productsType[key]);
      }
    }
    setProducts(newOne);
    

  }
  return (
    <>
      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our menu</h2>
          </div>
          <ul className="filters_menu">
            <li
              className={activeItem === "*" ? "active" : ""}
              data-filter="*"
              onClick={() => {
                setActiveItem("*");
                addProducts(productsType);
              }}
            >
              All
            </li>
            <li 
              className={activeItem === "Burgers" ? "active" : ""}
              data-filter=".burger" 
              onClick={(e) => handleOnclick(e, "Burgers")}
            >
              Burgers
            </li>
            <li 
              className={activeItem === "Pizza" ? "active" : ""}
              data-filter=".pizza" 
              onClick={(e) => handleOnclick(e, "Pizza")}
            >
              Pizza
            </li>
            <li 
              className={activeItem === "Pasta" ? "active" : ""}
              data-filter=".pasta" 
              onClick={(e) => handleOnclick(e, "Pasta")}
            >
              Pasta
            </li>
            <li 
              className={activeItem === "Fries" ? "active" : ""}
              data-filter=".fries" 
              onClick={(e) => handleOnclick(e, "Fries")}
            >
              Fries
            </li>
          </ul>
          <div className="filters-content">
            {products && (
              <div className="row grid">
                {products.map((item) => (
                  <Product key={item.name} props={item} />
                ))}{" "}
              </div>
            )}
          </div>
          {buttonView && (
            <div className="btn-box">
              <NavLink to="/menu">View More</NavLink>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
export default OurMenu;
