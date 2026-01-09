import mongoose from 'mongoose';
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import multer from  'multer';
import { log } from 'console';
import path from 'path'

const app = express();
const PORT = 4000;


app.use(express.json());
app.use(cors());
app.use('/upload/images',
  express.static('upload/images')
)


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
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
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
   description:{
    type:String,
    required:true
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
    description: req.body.description,
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

//creating category  Api
app.get("/allproduct/:category", async(req,res) =>{
  try {
    const category = req.params.category;
    const products = await Product.find({category: category,});
    res.status(200).json({success: true, products})
    
  } catch (error) {
    res.status(500).json({success: false})
    
  }
})

//Getting Single Product by ID
app.get('/product/:id', async (req,res) =>{
  try {
    let product = await Product.findOne({id: parseInt(req.params.id)})
    if(product) {
      res.send(product)
    } else {
      res.status(404).json({success: false, message: "Product not found"})
    }
  } catch(error) {
    res.status(500).json({success: false, message: error.message})
  }
})

// Shema Creating for User
const Users = mongoose.model('Users', {
  name:{
    type:String,

  },
  email:{
    type:String,
    unique:true,

  },
  password:{
    type:String,

  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now
  }
})

//creating endPoint registring user
app.post('/signup', async(req, res) =>{

  let check = await Users.findOne({email:req.body.email});
  if(check) {
    return res.status(400).json({success:false,errors:"existing user found with same email address"})
  }
  let cart = {};
  for (let i = 0; i <300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })

  await user.save();

  const data = {
    user:{
      id:user.id
    }
  }

  const token = jwt.sign(data,'secret_ecom');
  res.json({success:true, token})
})


//Creating endpoint for user
app.post('/login', async(req,res) =>{
  let user = await Users.findOne({email:req.body.email});
  if(user){
    const passCompare = req.body.password === user.password;
    if(passCompare){
      const data = {
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom');
      res.json({success:true, token});
    }
    else{
      res.json({success:false, errors:"Wroung Password"})
    }
  }
  else{
    res.json({success:false,errors:"Wrong Email Id "})
  }
})

//Creating middleware  to addtocart(fetch user)
const fetchUser = async (req,res, next) =>{
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({errors:"Please Authenticate using valid Token"})
  }
  else{
    try {
      const data = jwt.verify(token,'secret_ecom');
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({errors: "Please Authentice using a valid token"}) 
    }
  }
}
//creating endpoint for adding products in cartData
app.post('/addtocart',fetchUser, async (req, res) =>{
  console.log("Added", req.body.product);
  let userData = await Users.findOne({_id:req.user.id});
  userData.cartData[req.body.product] += 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send({success:true, message: "Added"})
  
})


//creating endPoint to remove product from cartData

app.post('/removefromcart',fetchUser,async (req, res) =>{
  console.log("removed", req.body.product);
  let userData = await Users.findOne({_id:req.user.id});
  if(userData.cartData[req.body.product] > 0)
  userData.cartData[req.body.product]  -= 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send({success:true, message:"item Removed"})
})


//creating to get cartData
app.post('/getcart',fetchUser,async(req,res) =>{
  console.log('GetCart');
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
  
})






app.listen(PORT, (error) =>{
  if(!error){
    console.log("Server Running on PORT:", PORT);
    
  } else{
    console.log('Server error ocoured', error);
    
  }
})















