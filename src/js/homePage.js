fetch("https://dummyjson.com/products").then(response =>{
    if(response.ok == false){
        throw new Error("status code is not in wanted range");
    }
    return response.json();
}).then(data =>{
    
    

}).catch(error => {
    console.error(error);
})