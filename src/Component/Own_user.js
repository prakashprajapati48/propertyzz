import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";

const Own_user = () => {
    const [data, setData] = useState([])
    const isMobile = window.innerWidth <= 720
    // const isMobile = window.innerWidth <= 720

    useEffect(() => {
        axios.get("http://localhost:5000/data_retriver", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.error(err));
    }, [])

    const navigate = useNavigate()
    let data_send = (product, category) => {
        navigate("/AllData", { state: { product, category } })
    }

    return (
        <>
            {/* {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className={`product-card ${preview ? "blurred" : ""}`}>
                        <h3>{item.propertyTitle}</h3>
                        <SimpleImageSlider
                            width={896}
                            className="img"
                            height={504}
                            images={item.propertyImage.map(url => ({ url }))}
                            showNavs={true}
                            onClick={(idx) => previewImg(item.propertyImage[idx])}
                            style={{ objectFit: "cover" }}
                        />
                        <p>{item.propertyDesc}</p>
                        <p>Price: {item.propertyPrice}</p>
                        <p>{item.country}</p>
                    </div>
                ))
            ) : (
                <p>No uploads yet.</p>
            )} */}
            <div className="all_data_own_user product-card">
                <h3>My Uploaded Data</h3>
                {data.length > 0 ? (
                    data.map((item, id) => (
                        <>
                            {/* <h2>{item.propertyTitle}</h2> */}
                            <SimpleImageSlider
                                width={isMobile ? "416px" : 896}
                                height={504}
                                key={id}
                                bgColor="#ffffff"
                                images={item.propertyImage.map(url => ({ url }))}
                                onClick={() => data_send(item, "owner")}
                                style={{ borderRadius: "10px" }}
                            />
                            <div className="product_details">
                                <p>{item.propertyDesc}</p>
                                <p>{item.propertyPrice}</p>
                                <p>{item.country}</p>
                            </div>
                        </>
                    ))
                ) : (
                    <p>No uploads yet.</p>
                )}
            </div>
        </>
    )
}

export default Own_user
