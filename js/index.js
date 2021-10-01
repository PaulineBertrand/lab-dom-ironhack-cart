// ITERATION 1

function updateSubtotal(product) {

  // Computing subtotal
  const price = product.querySelector('.price span').textContent;
  const quantity = product.querySelector('.quantity > input').value;
  const subtotal = quantity*price;

  // Displaying subtotal
  const subtotalLocation = product.querySelector(".subtotal span")
  subtotalLocation.textContent = subtotal;

  // Returning subtotal
  return subtotal;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  const productList = document.querySelector('#cart');
  const allProducts = productList.getElementsByClassName("product")
  const totalPriceLocation = document.querySelector("#total-value span");
  
  let totalPrice = 0;

  for (let product of allProducts) {
    totalPrice += updateSubtotal(product);
  }

  totalPriceLocation.textContent = totalPrice;
  return totalPrice;
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  target.parentNode.parentNode.remove();

  calculateAll();
}

// ITERATION 5

function createProduct() {

  // gets the important locations
  const createProductBar = document.querySelector(".create-product")
  const newProductName = createProductBar.querySelector("input[type=text]").value;
  const newProductPrice = createProductBar.querySelector("input[type=number]").value;
  const newProductLocation = document.querySelector("#cart tbody");

  // constructs the new product with them

  const newProduct = `<td class="name">
    <span>${newProductName}</span>
  </td>
  <td class="price">$<span>${newProductPrice}</span></td>
  <td class="quantity">
    <input type="number" value="0" min="0" placeholder="Quantity" />
  </td>
  <td class="subtotal">$<span>0</span></td>
  <td class="action">
    <button class="btn btn-remove">Remove</button>
  </td>`;

  // puts the new product in html
  const newProductTr = document.createElement("tr");
  newProductLocation.appendChild(newProductTr);
  newProductTr.classList.add("product");
  newProductTr.innerHTML = newProduct;

  // cleans the create product bar
  createProductBar.querySelector("input[type=text]").value = "";
  createProductBar.querySelector("input[type=number]").value = 0;

  // puts an addEventListener on the new remove button
  const newRemoveButton = newProductTr.querySelector(".btn-remove");
  newRemoveButton.addEventListener('click', removeProduct);
}

window.addEventListener('load', () => {
  // Computing prices
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
  
  // Adding products
  const createProductBtn = document.querySelector("#create")
  createProductBtn.addEventListener('click', createProduct);

  // Removing products
  const removeButtons = document.getElementsByClassName("btn-remove");
  for (let removeButton of removeButtons) {
    removeButton.addEventListener('click', removeProduct);
  }

});
