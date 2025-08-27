import React from 'react'

const Product = () => {
  return (
    <>
      <form action="http://localhost:5000/product" method="post" encType="multipart/form-data" className="upload_form" >
        <div className="Upload_data">
          <input type="hidden" name="username" value={localStorage.getItem("username")} />
          <input type="file" name="uplod_file" id="uplod_file" placeholder="Upload iamge" accept="image/*" multiple /> <br />
          <input type="text" name="upload_file_title" id="upload_file_title" placeholder="Enter title" /> <br />
          <input type="text" name="upload_file_desc" id="upload_file_desc" placeholder="Enter Description" minLength={20} /> <br />
          <input type="number" name="price" id="price" placeholder="Enter price" /> <br />
          <select name="country">
            <option value="Select Country">Select Country</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
          </select> <br />
          <input type="submit" value="upload" className="upload_btn" />
        </div>
      </form>
    </>
  )
}

export default Product
