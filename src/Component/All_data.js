import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import SimpleImageSlider from 'react-simple-image-slider';
import Chatmsg from './Chatmsg';
import Search from './Search'
import edit_icon from '../Icon/edit_icon.svg'

const All_data = () => {
    const location = useLocation()
    const { product, category } = location.state || {};
    const owneruser = product.username;
    const isMobile = window.innerWidth <= 720

    if (!product) {
        console.log("No data found")
    }

    const [preview, setPreview] = useState("")

    let previewImg = (img) => {
        setPreview(img)
    }

    let closePreview = () => {
        setPreview(null)
    }

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateData, setUpdateData] = useState({
        updateTitle: "",
        updateDesc: "",
        updatePricePrice: ""
    });

    const [visible, setVisible] = useState("block")

    let update = () => {
        setUpdateData({
            updateTitle: product.propertyTitle,
            updateDesc: product.propertyDesc,
            updatePrice: product.propertyPrice
        })

        setIsUpdate(true)
        setVisible("none")

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div className="all_items_data">
                <div className="search_option">
                    <Search />
                </div>
                <div className={`product-card ${preview ? "blurred" : ""}`}>
                    {/* <p>{product.propertyId}</p> */}
                    <h2 className="title_detail">
                        {product.propertyTitle}
                    </h2>
                    <SimpleImageSlider
                        width={isMobile ? "416px" : 700}
                        height={404}
                        className="img slider_img"
                        bgColor="#ffffff"
                        borderRadius={"15px"}
                        showNavs={true}
                        images={product.propertyImage.map(url => ({ url }))}
                        onClick={(idx) => previewImg(product.propertyImage[idx])}
                        style={{ borderRadius: "10px",marginLeft: "1rem" }}
                    />
                    <p className="description product_data">{product.propertyDesc}</p>
                    <p className="price product_data">{product.propertyPrice}</p>
                    <p className="country product_data">{product.country}</p>
                    <input type="hidden" name={product.username} />
                    {category === "owner" && (
                        // <button button className="update_btn" onClick={update} style={{ display: visible }}>Update</button>
                        <div className="update_btn" onClick={update} style={{ display: visible }}>
                            <img src={edit_icon} alt="" />
                        </div>
                    )}
                    <Chatmsg owneruserdata={{ owneruser: owneruser, productID: product.propertyId }} />
                    {/* <Chatmsg owneruser={{ owneruser: owneruser, userId: userId }} /> */}
                </div >
            </div>

            {preview && (
                <div className="image_preview" onClick={closePreview}>
                    <img src={preview} alt="" />
                </div>
            )
            }

            {
                isUpdate && (
                    <>
                        <form action="http://localhost:5000/update_data" method="post">
                            <input type="hidden" name="ids" value={product.propertyId} />
                            <input type="text" name="updateTitle" value={updateData.updateTitle} onChange={handleChange} />
                            <input type="text" name="updateDesc" value={updateData.updateDesc} onChange={handleChange} />
                            <input type="number" name="updatePrice" value={updateData.updatePrice} onChange={handleChange} />
                            <button type="submit" >
                                Save
                            </button>
                        </form>
                    </>
                )
            }

            {/* <button onClick={() => chatdata(product)}>chat</button> */}
        </>
    )
}

export default All_data
