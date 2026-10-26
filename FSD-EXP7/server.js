const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

let products = [{id:1,name:"Laptop",price:50000}];

app.get("/products",(req,res) => {
  res.json(products);
})

app.post("/products",(req,res)=>{
  const {name,price} = req.body;
  const newId = products.length> 0
  ? Math.max(...products.map(product=>product.id))+1
  : 1;
  const newProduct = {
    id:newId,
    name,
    price
  };
  products.push(newProduct);
  res.status(201).json({message:"Product added"});
});

app.put("/products/:id",(req,res)=>{
  const id = Number(req.params.id);
  const product = products.find(p=>p.id===id);

  if (!product){
    return res.status(404).json({
      message: "Product not found"
    });
  }
  const {name,price} = req.body;
  product.name = name;
  product.price = price;

  res.json({message:"Product updated"});
});

app.patch("/products/:id",(req,res)=>{
  const id = Number(req.params.id);
  const product = products.find(p=>p.id ===id);

  if(!products){
    return res.status(404).json({
      message: "Product not found"
    });
  }

  const {name,price} = req.body;

  if(name !== undefined){
    product.name = name;
  }

  if(price !== undefined){
    product.price = price;
  }

  res.json({message: "Product partially updated"});
});


app.delete("/product/:id",(res,req)=>{
  const id = Number(req.params.id);
  const index = product.findIndex(p=> p.id === id);

  if(index === -1){
    return res.status(404).json({
      message:"Product not found"
    });
  }

  products.splice(index,1);
  res.json({message:"product deleted"});
});

app.listen(port,()=>{
  console.log(`Server running at http://localhost:${port}`);
})