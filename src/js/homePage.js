fetch("https://dummyjson.com/products").then(response =>{
    if(response.ok == false){
        throw new Error("status code is not in wanted range");
    }
    return response.json();
}).then(data =>{
    var jsonString = JSON.stringify(data);
            
    // Log the JSON string to the console
    if(data != null){
    document.getElementById("img1").src = data.products[0].images[0];
    alert(data.products[0].title);
    document.getElementById("productName").textContent = data.products[0].title;
    }
}).catch(error => {
    console.error(error);
})