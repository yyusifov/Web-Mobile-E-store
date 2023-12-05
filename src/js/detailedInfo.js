const getProduct = localStorage.getItem("productObject");
const getProductId = localStorage.getItem("productId");


var product = JSON.parse(getProduct);

document.getElementById("imageofproduct").src = product.images[0];

document.getElementById("productTitle").textContent = product.title;

document.getElementById("productBrand").textContent = "Brand: " + product.brand;

document.getElementById("productCategory").textContent = "Category: " + product.category;

document.getElementById("productPrice").textContent = "Price: " + product.price;

document.getElementById("productDiscount").textContent = "Discount: " + product.discountPercentage + "%";

document.getElementById("productStock").textContent = "Stock: " + product.stock;

document.getElementById("productDescription").textContent = "Description: " + product.description;

var cnt = 0;
function imageFromLeft(){
    if(cnt > 0){
        cnt--;
    }
    console.log(product[cnt]);
    document.getElementById("imageofproduct").src = product.images[cnt];
}

function imageFromRight(){
    if(cnt < product.images.length - 1){
        cnt++;
    }
    console.log(product.images[cnt]);
    document.getElementById("imageofproduct").src = product.images[cnt];
}