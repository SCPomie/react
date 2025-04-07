//have this in app.js for routing
npm install react-router-dom
import { Route, Routes } from 'react-router-dom';


// import and wrao this in index.js
import { BrowserRouter } from 'react-router-dom';
<BrowserRouter>
<App />
</BrowserRouter>


//basic navbar
import { Link } from "react-router-dom";
import React from "react";

const NavBar = () => {
    return (
        <nav>
        <Link to="/">Home</Link>
        <Link to="/category">category</Link>
        <Link to="/order">Order</Link>
        <Link to="/customer">customer</Link>
        </nav>
    )
}

export default NavBar

//basic fetching data and display with li and links 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Category(){

    const [data, setDate] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/category/`)
        .then((response) => response.json())
        .then((data) => {
            setDate(data);
        })
        .catch((error) => {
            console.error("error:", error)
        })
    }, [])

    const CategoryList = ({data}) => {
        return (
            <div>
            <ul>
                {data.map(item => (
                    <li key={item.shortcode}>
                         <Link to={`/category/${item.shortcode}`}>
                        {item.shortcode}: {item.display_name}
                        </Link>
                    </li>
                ))}
            </ul>
            </div>
        )
    }

    return (
        <div>
            <h2>All Category</h2>
            <CategoryList data={data} />
        </div>
    )
}

export default Category

//for individual items using a param
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IndividualCat(){

    const[data, setdata] = useState([])
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/product/?category=${id}`)
        .then((response) => response.json())
        .then((data) => {
            setdata(data)
        })
        .catch((error) => {
            console.error("error:", error)
        })
    }, [id])

    const ProductList = ({data}) => {
        return (
            <div>
                <ul>
                    {data.map(item => (
                        <li key={item.name}>
                            {item.name} : {item.price}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div>
            {ProductList({data})}
        </div>
    )
}

export default IndividualCat


//if asking for dynamic 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderStatusList() {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/order-status/") // replace with your actual endpoint
      .then(res => res.json())
      .then(data => setStatuses(data))
      .catch(err => console.error("Failed to fetch statuses:", err));
  }, []);

  return (
    <div>
      <h2>Order Statuses</h2>
      <ul>
        {statuses.map(status => (
          <li key={status.code}>
            <Link to={`/orders/status/${status.code}`}>
              {status.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderStatusList;
