

let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategInput = document.getElementById("productCategory");
let productDescInput = document.getElementById("productDesc");
// console.log(productNameInput, productPriceInput, productCategInput, productDescInput);

let mainBtn = document.getElementById("mainBtn");
let dataIndex = 0;
let ProductArray;

if (localStorage.getItem("products") == null) {
    ProductArray = [];
} else {
    ProductArray = JSON.parse(localStorage.getItem("products"));
    displayProduct(ProductArray);
}
// console.log(mainBtn)

mainBtn.onclick = add;




function add() {
    if (mainBtn.innerHTML == "Add Product") {
        addProduct()
    }
    else {
        editData()
    }
}


    function addProduct() {
        if ( validateProductName() == true) {
            var product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                category: productCategInput.value,
                decription: productDescInput.value,
            }
        
            ProductArray.push(product);
        
        
            localStorage.setItem("products", JSON.stringify(ProductArray))
            clearForm();
            displayProduct(ProductArray);
            // console.log(ProductArray)
        }
        else {
            alert("name must contain captal letter")
        }
      
    }
    



function displayProduct(productList) {
    let box = "";


    for (let i = 0; i < productList.length; i++) {
        box += `
        <tr>
        <td>${i + 1}</td>
        <td>${productList[i].name} </td>
        <td>${productList[i].price} </td>
        <td>${productList[i].category} </td>
        <td>${productList[i].decription} </td>
       <td> <button onclick = "updateProduct(${i})" class="btn btn-danger" > Update </button></td>
        <td><button onclick="deletProduct(${i})" class="btn btn-info"> delete </button></td>

        </tr>`

    }
    document.getElementById("tableRow").innerHTML = box;

}


// document.getElementById("tableRow").innerHTML = "hhh"



function clearForm() {

    productNameInput.value = "";
    productPriceInput.value = "";
    productCategInput.value = "";
    productDescInput.value = "";
}


function deletProduct(productIndex) {
    ProductArray.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(ProductArray))
    displayProduct(ProductArray);
}




function searchProduct(term) {
    // let term = this.value;
    let searchProduct = [];
    for (let i = 0; i < ProductArray.length; i++) {
        if (ProductArray[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            searchProduct.push(ProductArray[i])
        }

    }
    displayProduct(searchProduct);
}




function updateProduct(index) {
    dataIndex = index;
    productNameInput.value = ProductArray[index].name;
    productPriceInput.value = ProductArray[index].price;
    productDescInput.value = ProductArray[index].decription;
    productCategInput.value = ProductArray[index].category;
    mainBtn.innerHTML = "Update Product"

}



function editData() {
    ProductArray[dataIndex].name = productNameInput.value;
    ProductArray[dataIndex].price = productPriceInput.value;
    ProductArray[dataIndex].category = productCategInput.value;
    ProductArray[dataIndex].decription = productDescInput.value;

    localStorage.setItem("products", JSON.stringify(ProductArray));

    clearForm();
    mainBtn.innerHTML = "Add Product";

    displayProduct(ProductArray);


}


//vaildation

function validateProductName() {
let regex = /^[A-Z][a-z]{1,8}$/
 if(regex.test(productNameInput.value) == true) {
     return true;
 }
 else {
     return false;
 }
}
