//Default value
var itemProperty = "allItems";
//When the whole page is loaded, we can call showItems function to demonstrate items
window.onload = function(){
    showItems(itemProperty);
};

function showItems(itemProperty){
fetch("https://dummyjson.com/products").then(response =>{
    if(response.ok == false){
        throw new Error("status code is not in wanted range");
    }
    return response.json();
}).then(data =>{

    /*It will determine how many items will be inserted. The main purpose for me to use it is to
    make sure that I create correct number of row. If I do not specify it 1 or maybe 2 elements will
    pop up in a row. It will have unpleasant view.*/

    //If contains any element, we are gonna remove it to reload for every search
    var container = document.querySelectorAll(".row");
    if(container.childNodes == undefined){
        container.forEach(function(element){
            element.remove();
        });
    }
    let cnt = 0;
    const productContainer = document.getElementById("productContainer");

    for(let i = 0; i < data.products.length; i++){

        
        if(cnt % 4 == 0){
            var row = document.createElement("div");
            row.classList.add("row");
        }

        if(itemProperty == "allItems" || data.products[i].title == itemProperty || data.products[i].description == itemProperty || data.products[i].category == itemProperty){
            cnt++;
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

            const linktonexthtml = document.createElement("a");
            linktonexthtml.classList.add("nextHtml");
            linktonexthtml.href = "productInfo.html";

            const stockofproduct = document.createElement("span");
            stockofproduct.classList.add("stockofproduct");
            stockofproduct.textContent = data.products[i].stock;

            row.appendChild(linktonexthtml);

            linktonexthtml.appendChild(product);
            
            product.appendChild(imageFrame);
            
            product.appendChild(shortInfo);
            
            imageFrame.appendChild(productImage);
            
            shortInfo.appendChild(productName);
            
            shortInfo.appendChild(productPrice);
            
            shortInfo.appendChild(productDiscount);
            
            shortInfo.appendChild(stockofproduct);

            productContainer.appendChild(row);
                product.addEventListener("click", function(){
                    const productId = data.products[i].id;

                    localStorage.setItem("productObject",JSON.stringify(data.products[i]));
                    localStorage.setItem("productId",productId);
                });
        }
    }
}).catch(error => {
    console.error(error);
})
}


function searchItem(){
    itemProperty = document.getElementById("searchKeyword").value;
    showItems(itemProperty);
}