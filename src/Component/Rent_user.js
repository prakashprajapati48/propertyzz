import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Rent_user = () => {
  const [image, setImages] = useState([])
  const [data, setData] = useState([])
  const [search_data, setSearch_data] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:5000/product-item")
      .then(res => {
        let img = res.data
        setImages(img)
      })
      .catch(err => console.error(err));
  }, [])

  useEffect(() => {
    let params = new URLSearchParams(window.location.search)
    let results = params.get("results")

    if (results) {
      setData(JSON.parse(results))
      setSearch_data(true)
    }
    console.log(results)
    // console.log(data)
  }, [])

  const imageSize = window.innerWidth <= 720
  const navigate = useNavigate()

  let data_send = (product, category) => {
    navigate("/AllData", { state: { product, category } })
  }
  return (
    <>
      <div className="all_data search_ids">
        <input type="hidden" name="shows" value={search_data} />
        {search_data ? (<div className="search_result_data">
          {data.map((data, idx) => (
            <div key={idx} className="search_Data search_images">
              {/* <h3>{data.propertyTitle}</h3> */}
              <img src={data.propertyImage[0]} alt="" style={{ width: "100%", cursor: "pointer", backgroundColor: "#ffffff", backgroundSize: imageSize ? "contain" : "cover", borderRadius: "10px", aspectRatio: "4/3" }} className="search_img" onClick={() => data_send(data)} />
              <div className="product_details">
                <p className="property_description" >{data.propertyDesc.slice(0, 40)}</p>
                <p>{data.propertyPrice}</p>
                <p>{data.country}</p>
              </div>
            </div>
          ))}
        </div>
        ) : (

          <div className="all_data search_all_data">
            {/* <div className="all_Datas_items"> */}
            {image.map(product => (
              <div className={`ids `} key={product.propertyId}>
                {/* <h2>{product.propertyTitle}</h2> */}
                <div className="images ">
                  <img src={product.propertyImage[0]} alt="" style={{ width: "100%", cursor: "pointer", backgroundColor: "#ffffff", backgroundSize: imageSize ? "contain" : "cover", borderRadius: "10px" }} onClick={() => data_send(product)} className="img" />
                </div>
                <div className="product_details">
                  {/* {product.ropertyDesc.split(" ").slice(0, 80).join(" ") + "..."}</p> */}
                  <p className="property_description" >
                    {product.propertyDesc.split(" ").slice(0, 25).join(" ") + "..."}
                    {/* {product.propertyDesc.split(" ").slice(0, 25).join(" ") + "..."} */}
                  </p>
                  <p>{product.propertyPrice}</p>
                  <p>{product.country}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* {preview && (
          <>
            <div className="image_preview" onClick={closePreview}>
              <div className="preview_imgs">
                <img src={preview} alt="" />
              </div>
            </div>
          </>
        )} */}
      </div >
    </>
  )
}

export default Rent_user
