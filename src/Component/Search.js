import React from 'react'
import { Link } from 'react-router-dom'
import search_icon from '../Icon/search-line.svg'

const Search = () => {
    return (
        <>
            <div className="search">
                <div className="search_heading">
                    Find Your Perfect Property
                </div>

                <form action="http://localhost:5000/search-item" method="post" className="search_form">
                    <div className="searchs">
                        <h2>
                            Search
                        </h2>

                        {/* <button className="search_item_link" type="submit" >search</button> */}
                        <Link to={"/search"} className="search_link">
                            <img src={search_icon} className="search_item_link" alt="" style={{ width: "100%", maxWidth: "42%" }} />
                        </Link>
                    </div>
                    <label htmlFor="titles" className="search_label">Enter Title</label>
                    <input type="text" name="search_item" id="search_item" placeholder="Search House" className="search_field" required />
                    {/* <input type="button" value="Search" /> */}

                    <div className="filter">
                        <label htmlFor="search_location" className="search_label">Location</label>
                        <select name="location_filter" className="search_field" id="location_filter" required>
                            <option value="Location">Select Location...</option>
                            <option value="India">India</option>
                        </select>

                        <label htmlFor="search_price" className="search_label">Price</label>
                        <select name="price_filter" id="price_filter" className="search_field" required>
                            <option value="prices">Select Price...</option>
                            <option value="price1">10000 - 100000</option>
                            <option value="price1">100000 - 200000</option>
                            <option value="price1">200000 - 1000000</option>
                        </select>

                        <button type="submit" className="search_field search_field_btn" >Search</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Search
