const getProduct = localStorage.getItem("productObject");
const getProductId = localStorage.getItem("productId");


var product = JSON.parse(getProduct);

document.getElementById("imageofproduct").src = product.images[0];

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