export const productId = 0;
fetch("https://dummyjson.com/products").then(response =>{
    if(response.ok == false){
        throw new Error("status code is not in wanted range");
    }
    return response.json();
}).then(data =>{
    
    const productContainer = document.getElementById("productContainer");
    for(let i = 0; i < data.products.length; i++){

        if(i % 4 == 0){
        var row = document.createElement("div");
        row.classList.add("row");
        }

        const product = document.createElement("div");
        product.classList.add("product");

        const imageFrame = document.createElement("div");
        imageFrame.classList.add("imageFrame");

        const productImage = document.createElement("img");
        productImage.src = data.products[i].thumbnail;

        const shortInfo = document.createElement("div");
        shortInfo.classList.add("shortInfo");

        const productName = document.createElement("div");
        productName.classList.add("productName");
        productName.textContent = data.products[i].title;

        const productPrice = document.createElement("span");
        productPrice.classList.add("productPrice");
        productPrice.textContent = data.products[i].price + "$";


        const productDiscount = document.createElement("span");
        productDiscount.classList.add("productDiscount");
        productDiscount.textContent = data.products[i].discountPercentage + "%";

        const categoryofproduct = document.createElement("span");
        categoryofproduct.classList.add("categoryofproduct");
        categoryofproduct.textContent = data.products[i].category;

        const stockofproduct = document.createElement("span");
        stockofproduct.classList.add("stockofproduct");
        stockofproduct.textContent = data.products[i].stock;

        row.appendChild(product);
        product.appendChild(imageFrame);
        product.appendChild(shortInfo);
        imageFrame.appendChild(productImage);
        shortInfo.appendChild(productName);
        shortInfo.appendChild(productPrice);
        shortInfo.appendChild(productDiscount);
        shortInfo.appendChild(stockofproduct);
        productContainer.appendChild(row);

        product.addEventListener("click", function(){
            productId = data.products[i].id;
        });
    }
}).catch(error => {
    console.error(error);
})