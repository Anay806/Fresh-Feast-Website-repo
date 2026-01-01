import mongoose from 'mongoose';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken'
import cors from 'cors'
import multer from  'multer';
import { log } from 'console';
import path from 'path'

const app = express();
const PORT = 4000;


app.use(express.json());
app.use(cors());


//DataBase connection with mongoDB
mongoose.connect('mongodb+srv://anayshrivastava1999:anayshrivastava1999@cluster01.htjdvwa.mongodb.net/fresh-feast')

// Api creation

app.get('/', (req, res) =>{
  res.send("Server is Running")
})

//Image storage Confirguration
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) =>{
    return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage:storage})


//Image Upload Api
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) =>{
res.json({
  success: 1,
  image_url: `http://localhost:${PORT}/images/${req.file.filename}`
})

})

//Schema for Creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,

  },
  name: { 
    type: String,
    required: true
  },
   image:{
    type: String,
    required: true
   },
   category: {
    type: String,
    required: true
   },
   new_price: {
    type : Number,
    required : true
   },
   old_price: {
    type: Number,
    required: true
   },
   date : {
    type : Date,
    default : Date.now,
   },
   available : {
    type : Boolean,
    defalut  : true 
   }
})

app.post('/addproduct', async (req, res) =>{
  let products = await Product.find({});
  let id;
  if(products.length > 0)
  {
    let last_product_array = products.slice(-1)
    let last_product = last_product_array[0];
    id = last_product.id +1;
  }
  else{
   id=1 ;
  }
  const product = new Product({
    id:id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save()
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name
  })
  
})

//Deliting a Product from dataBase
app.post('/removeproduct', async (req, res) =>{
  await Product.findOneAndDelete({id: req.body.id});
  console.log("Item removed ID:" ,req.body.id);
  res.json({
    success: true,
    name: req.body.name 
  });
  
})


//Getting All Products from DataBase
app.get('/allproducts', async (req,res) =>{
  let products = await Product.find({})
  console.log("All Product Feached");
  res.send(products)
  
})

app.listen(PORT, (error) =>{
  if(!error){
    console.log("Server Running on PORT:", PORT);
    
  } else{
    console.log('Server error ocoured', error);
    
  }
})















