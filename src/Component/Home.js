import React, { useEffect, useState } from 'react'
import Rent_user from './Rent_user'
import Own_user from './Own_user'
import { Link } from 'react-router-dom'
import search_icon from '../Icon/search-line.svg'
// import search_icon from '../Icon/search-line.png'

const Home = () => {
    const [category, setCatefory] = useState()

    useEffect(() => {
        const user_category = localStorage.getItem("user_category")
        setCatefory(user_category)

    }, [])

    return (
        <>
            <div className="title">
                <h2 className="header_title">Find Your Perfect Property</h2>
                {/* <Link to={"/search"} className="search_link">
                    <button className="find_btn">Search</button>
                </Link> */}
                <Link to={"/search"} className="search_link">
                    <img src={search_icon} className="search_item_link" alt="" />
                </Link>
            </div>
            {category === "rental" ?
                (<Rent_user />) : category === "owner" ?
                    (<Own_user />) : <Rent_user />}
            {/* {category === "owner" && <Own_user/>}
            {category === "rental" && <Rent_user/>} */}
        </>
    )
}

export default Home
