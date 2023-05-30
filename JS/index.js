var nameOfProduct = document.getElementById("productName");
var priceOfProduct = document.getElementById("productPrice");
var typeOfProduct = document.getElementById("productType");
var descOfProduct = document.getElementById("productDesc");
var addButton = document.getElementById("addBtn"); 
var tBody = document.getElementById("tBody");
var inputs = document.getElementsByClassName("form-control");
var searchTxt = document.getElementById("searchTxt");
var productIndex = 0;

var products = [];
if(JSON.parse(localStorage.getItem("productsInfo")) !=null ){
   products= JSON.parse(localStorage.getItem("productsInfo"));
   showProducts();
}

addButton.onclick = function(){
 if(addButton.innerHTML=="Add"){
   addProduct();
 }else{
   updateInfo()
 }
 showProducts();
 resetData();
}

function addProduct(){
 var product ={
  name:nameOfProduct.value,
  price:priceOfProduct.value,
  type:typeOfProduct.value,
  desc:descOfProduct.value,
 };
 products.push(product);
 localStorage.setItem("productsInfo",JSON.stringify(products));
}
function showProducts(){
var cartona="";
for(var i=0;i<products.length;i++){
cartona+=`
<tr>
   <td>${products[i].name}</td>
   <td>${products[i].price}</td>
   <td>${products[i].type}</td>
   <td>${products[i].desc}</td>
   <td><button class="btn btn-outline-warning" id="updateBtn" onclick='getProducts(${i})'>update</button></td>
   <td class="btn btn-outline-danger mt-2"
   onclick="deleteButton(${i})">delete</td>
</tr>`
}
tBody.innerHTML=cartona;
} 

function resetData(){
   for(var i=0; i<inputs.length;i++){
      inputs[i].value='';
   }
}

function deleteButton(index){
   products.splice(index,1);
   showProducts();
   localStorage.setItem("productsInfo",JSON.stringify(products));
}

function search(e){
   var cartona='';
 for(var i = 0;i<products.length;i++){
   if(products[i].name.toLowerCase().includes(e.value.toLowerCase())){
      cartona +=
        `
    <tr>
      <td>${products[i].name}</td>
      <td>${products[i].price}</td>
      <td>${products[i].category}</td>
      <td>${products[i].desc}</td>
      <td><button class='btn btn-outline-warning' onclick='getProducts(${i})'>update</button></td>
      <td><button onclick='deleteProduct(${i})' class='btn btn-outline-danger'>delete</button></td>
    </tr>
    `
    }
   }
   tBody.innerHTML=cartona;
 }

function getProducts(index){
   productIndex = index;

   nameOfProduct.value=products[productIndex].name;
   priceOfProduct.value= products[productIndex].price;
   typeOfProduct.value= products[productIndex].type;
   descOfProduct.value=products[productIndex].desc;
   addButton.innerHTML="Update Product";
}

function updateInfo(){
   var product = {
      name:nameOfProduct.value,
      price:priceOfProduct.value,
      type:typeOfProduct.value,
      desc:descOfProduct.value,
   };
   products[productIndex]=product;
   localStorage.setItem("productsInfo",JSON.stringify(products));
   addButton.innerHTML="Add";
}