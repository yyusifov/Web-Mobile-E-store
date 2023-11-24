var productImages = ["../src/assets/1_org_zoom (1).webp","../src/assets/1_org_zoom (2).webp","../src/assets/1_org_zoom (3).webp","../src/assets/1_org_zoom (4).webp","../src/assets/1_org_zoom (5).webp"];

var cnt = 0;
function imageFromLeft(){
    if(cnt > 0){
        cnt--;
    }
    console.log(productImages[cnt]);
    document.getElementById("imageofproduct").src = productImages[cnt];
}

function imageFromRight(){
    if(cnt < productImages.length - 1){
        cnt++;
    }
    console.log(productImages[cnt]);
    document.getElementById("imageofproduct").src = productImages[cnt];
}