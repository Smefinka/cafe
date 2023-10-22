import React, { useEffect, useState } from "react";
import '../css/bootstrap.css'
import '../css/style.css'
import {useSelector} from "react-redux";
import Product from "../components/Product";

const Search = () => {
    const products = useSelector(state => state.products.filtedProducts);
    return(
        <>
<h1>Search</h1>
<section className="food_section layout_padding-bottom">
    <div className="container">
    <div className="filters-content"></div>
<div className="row grid">
                {products.map((item) => (
                  <Product key={item.name} props={item} />
                ))}
              </div>
              </div>
            
              </section>
        </>
    )
}
export default Search;