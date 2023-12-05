var categoryList = [];

var itemList = [];

var pageNumber = 1;

var totalPageNumber = 0;

//Default value
var itemProperty = "allItems";
//When the whole page is loaded, we can call showItems function to demonstrate items
window.onload = function(){
    showItems(itemProperty);
};

function showItems(itemProperty){
fetch("https://dummyjson.com/products?skip=0&limit=100").then(response =>{
    if(response.ok == false){
        throw new Error("status code is not in wanted range");
    }
    return response.json();
}).then(data =>{

    var rownumberdefiner = 0;

    if(itemProperty.trim().length == 0){
        itemProperty = "allItems";
    }
    /*It will determine how many items will be inserted. The main purpose for me to use it is to
    make sure that I create correct number of row. If I do not specify it 1 or maybe 2 elements will
    pop up in a row. It will have unpleasant view.*/

    //If contains any element, we are gonna remove it to reload for every search
    var container = document.querySelectorAll(".row");

    const paginationSection = document.getElementById("paginationSection");

    const pageNumberContainer = document.querySelectorAll(".pageNumber");

    if(pageNumberContainer.length != 0){
        pageNumberContainer.forEach(function(element){
            element.remove();
        });
    }

    if(container.length != 0){
        container.forEach(function(element){
            element.remove();
        });
    }
    let stopShowingItems = true;
    let cnt = 0;
    const productContainer = document.getElementById("productContainer");
    const filterContainer = document.getElementById("categoryFilter");
    for(let i = 0; i < data.products.length; i++){

        if(rownumberdefiner % 4 == 0){
            var row = document.createElement("div");
            row.classList.add("row");
        }

        if(cnt % (pageNumber*10) == 0 && cnt != 0){
            stopShowingItems = false;
        }

        

        if(itemProperty == "allItems" || data.products[i].title.toLowerCase().includes(itemProperty.toLowerCase()) || data.products[i].description.toLowerCase().includes(itemProperty.toLowerCase()) || data.products[i].category.toLowerCase().includes(itemProperty.toLowerCase())){
            if(stopShowingItems && (cnt >= (pageNumber * 10 - 10) && cnt < (pageNumber * 10))){
                rownumberdefiner++;
                const product = document.createElement("div");
                product.classList.add("product");

                const imageFrame = document.createElement("div");
                imageFrame.classList.add("imageFrame");

                const productImage = document.createElement("img");
                productImage.src = data.products[i].thumbnail;

                const shortInfo = document.createElement("div");
                shortInfo.classList.add("shortInfo");

                const productName = document.createElement("span");
                productName.classList.add("productName");
                productName.textContent = data.products[i].title;

                const productPrice = document.createElement("span");
                productPrice.classList.add("productPrice");
                productPrice.textContent = data.products[i].price + "$";


                const productDiscount = document.createElement("span");
                productDiscount.classList.add("productDiscount");
                productDiscount.textContent = data.products[i].discountPercentage + "% Discount!";

                const categoryofproduct = document.createElement("span");
                categoryofproduct.classList.add("categoryofproduct");
                categoryofproduct.textContent = data.products[i].category;

                const linktonexthtml = document.createElement("a");
                linktonexthtml.classList.add("nextHtml");
                linktonexthtml.href = "public/productInfo.html";

                const stockofproduct = document.createElement("span");
                stockofproduct.classList.add("stockofproduct");
                stockofproduct.textContent = "Stock: " + data.products[i].stock;



                row.appendChild(linktonexthtml);

                linktonexthtml.appendChild(product);
                
                product.appendChild(imageFrame);
                
                product.appendChild(shortInfo);
                
                imageFrame.appendChild(productImage);
                
                shortInfo.appendChild(productName);
                
                shortInfo.appendChild(productPrice);
                
                shortInfo.appendChild(productDiscount);
                
                shortInfo.appendChild(stockofproduct);

                shortInfo.appendChild(categoryofproduct);

                productContainer.appendChild(row);
                
                product.addEventListener("click", function(){
                    const productId = data.products[i].id;

                    localStorage.setItem("productObject",JSON.stringify(data.products[i]));
                    localStorage.setItem("productId",productId);
                });
            }
            if(!categoryList.includes(data.products[i].category)){
                const categoryElement = document.createElement("option");
                categoryElement.value = data.products[i].category;
                categoryElement.textContent = data.products[i].category;

                categoryList.push(data.products[i].category);
                filterContainer.appendChild(categoryElement);
            }
            cnt++;
        }
    }
    filterContainer.addEventListener("change", function() {
        const categoryChosen = filterContainer.value;
        itemProperty = categoryChosen;
        pageNumber = 1;
        showItems(itemProperty);
    });

    totalPageNumber = Math.ceil(cnt / 10);

    for(let j = 0; j < totalPageNumber; j++){
        const pageN = document.createElement("div");
        pageN.classList.add("pageNumber");

        const pageNT = document.createElement("span");
        pageNT.classList.add("pageText");
        pageNT.textContent = (j + 1).toString();

        if(pageNT.textContent == parseInt(pageNumber)){
            pageNT.style.textDecoration = "underline";
        }
        pageN.appendChild(pageNT);
        paginationSection.appendChild(pageN);

        pageN.addEventListener("click", function(){
            pageNumber = parseInt(pageNT.textContent);

            showItems(itemProperty);
        });
    }

        var searchIcon = document.getElementById('searchIcon');
        searchIcon.addEventListener("click", function(){
            let iProperty = document.getElementById("searchKeyword").value;
            if(!(iProperty.trim() === itemProperty.trim())){
                itemProperty = iProperty;
                pageNumber = 1;
                showItems(itemProperty.trim());
            }
        });

}).catch(error => {
    console.error(error);
})
}