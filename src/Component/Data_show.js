import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Data_show = () => {
    const [image, setImage] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:5000/product-item")
            .then(res => {
                let img = res.data
                setImage(img);
            })
            .catch(err => console.error(err))
    }, [])

    let detailes = (product,category) => {
        navigate("/AllData", { state: {product,category} })
    }

    return (
        <div>
            {image.map(product => (
                <div className="datas">
                    <h2 className="title">{product.propertyTitle}</h2>
                    <img src={product.propertyImage[0]} alt="" style={{ width: "40%", cursor: "pointer" }} onClick={() => detailes(product,"rental")} />
                    <p>{product.propertyDesc}</p>
                    <p>{product.propertyPrice}</p>
                    <p>{product.country}</p>
                </div>
            ))}
        </div>
    )
}

export default Data_show
