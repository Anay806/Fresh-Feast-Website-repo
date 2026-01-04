import React, { useState } from 'react'
import save from '../assets/save-3.png'

const AddProduct = () => {

  const [image, setImage] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category : "",
    new_price: "",
    old_price: ""
  })
  const imageHandler = (e) =>{
      setImage(e.target.files[0])
  }

  const changeHandler = (e) =>{
    setProductDetails({...productDetails, [e.target.name]: e.target.value})
  }

  const add_Product = async() =>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:8000/upload', {
      method: 'POST',
      headers: {
        Accept:"application/json"
      },
      body:formData,
    }).then((res) => res.json()).then((data) =>{responseData=data});
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      
    }
    
  } 


  return (
    <div className='flex flex-col bg-gray-50 w-[50%] gap-6 px-4 py-3 rounded-md mx-10 my-4 shadow-lg'>
      <div className='w-full'>
        <p className='font-semibold text-xl py-1'>Product Name</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' className='w-full px-4 py-2 bg-gray-50 border border-orange-300 rounded-md outline-none focus:ring-orange-600' />
      </div>
      <div className='flex' >
        <div className='w-[45%] py-1'>
          <p className='font-semibold text-xl py-1'>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" placeholder='Enter Price here' name='old_price' className='w-full px-4 py-2 bg-gray-50 border border-orange-300 rounded-md outline-none focus:ring-orange-600  '/>
        </div>
        <div className='py-1 w-[45%] ml-6'>
          <p className='font-semibold text-xl py-1'>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" placeholder='Type here' name='new_price' className='w-full px-4 py-2 bg-gray-50 border border-orange-300 rounded-md outline-none focus:ring-orange-600' />
        </div>
      </div>
      <div className='py-4'>
        <p className='font-semibold text-xl font-sans-serif py-1'>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='bg-gray-50 border border-orange-300 rounded-md px-4  py-2 w-[45%] outline-none focus:ring-orange-600'>
          <option value="Veg" >Veg</option>
           <option value="Non-Veg">Non-Veg</option>
            <option value="Noodles">Noodles</option>
             <option value="Chinese">Chinese</option>
        </select>
      </div>
      <div>
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):save} alt="" className='h-[100px] w-[100px]' />
        </label>
        <input onChange={imageHandler} type="file" name='image' className=''/>
      </div>
      <button onClick={()=>{add_Product()}} className='bg-orange-500 mt-4 hover:bg-orange-600 items-center justify-center flex w-[20%] cursor-pointer py-3 rounded-md text-white font-bold text-xl'>Add</button>
      
    </div>
  )
}

export default AddProduct
