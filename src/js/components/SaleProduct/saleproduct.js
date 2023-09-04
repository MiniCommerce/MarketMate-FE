import { apiAuthGet, apiAuthPatch } from "../../utils/fetchAPI.js";
import { URL } from "../../data/index.js";
import { getSessionStorage } from '../../utils/storage.js';

async function fetchProducts() {
  try {
    const token = getSessionStorage("token");
    const response = await apiAuthGet(URL.mysaleProduct, token);

    if (response) {
      return response;
    } else {
      console.error('Error fetching products:', response);
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function renderSale(products) {
  const tableBody = document.querySelector('#sale-table tbody');

  products.forEach(product => {
    const row = document.createElement('tr');
    const productImgCell = document.createElement('td');
    const img = document.createElement('img');
    const imgsrc = product.thumbnail_image;
    img.src = `${imgsrc}`;
    img.alt = 'Product Image';
    productImgCell.appendChild(img);
    row.appendChild(productImgCell);

    const productIdCell = document.createElement('td');
    productIdCell.textContent = product.id;
    productIdCell.classList.add('product-id');
    row.appendChild(productIdCell);

    const productNameCell = document.createElement('td');
    productNameCell.textContent = product.product_name;
    row.appendChild(productNameCell);

    const productstatusCell = document.createElement('td');
    const statusSelect = document.createElement('select');
    statusSelect.classList.add('status-select');
    const options = ['Sale', 'SoldOut', 'StopSelling'];
    options.forEach(optionText => {
      const option = document.createElement('option');
      option.value = optionText;
      option.textContent = optionText;
      if (optionText === product.product_status) {
        option.selected = true;
      }
      statusSelect.appendChild(option);
    });

    productstatusCell.appendChild(statusSelect);
    row.appendChild(productstatusCell);

    const productpriceCell = document.createElement('td');
    const priceinput = document.createElement('input');
    priceinput.type = 'text';
    priceinput.value = product.price;
    priceinput.classList.add('price-input');
    productpriceCell.appendChild(priceinput);
    row.appendChild(productpriceCell);

    const productamountCell = document.createElement('td');
    const amountinput = document.createElement('input');
    amountinput.type = 'text';
    amountinput.value = product.amount;
    amountinput.classList.add('amount-input');
    productamountCell.appendChild(amountinput);
    row.appendChild(productamountCell);

    const updateCell = document.createElement('td');
    const updateButton = document.createElement('button');
    updateButton.classList.add('submit-button');
    updateButton.textContent = '수정';

    updateButton.addEventListener('click', event => {
      updateSale(event);
    });

    updateCell.appendChild(updateButton);
    row.appendChild(updateCell);

    tableBody.appendChild(row);
  });
}

async function updateSale(event) {
  event.preventDefault();

  const updateButton = event.currentTarget;
  const row = updateButton.closest('tr');
  const productId = row.querySelector('.product-id').textContent;
  const statusSelect = row.querySelector('.status-select');
  const selectedStatus = statusSelect.value;
  const priceInput = row.querySelector('.price-input');
  const updatedPrice = priceInput.value;
  const amountInput = row.querySelector('.amount-input');
  const updatedAmount = amountInput.value;

  const token = getSessionStorage("token");
  const requestData = {
    product_id: productId,
    product_status: selectedStatus,
    price: updatedPrice,
    amount: updatedAmount 
  };

  try {
    const response = await apiAuthPatch(URL.productUpdateURL, requestData, token);
    if (response.status === 200) {
      console.log('Product updated successfully:');
    } else {
      console.error('Failed to update product:', response);
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

async function loadSale() {
  const products = await fetchProducts();
  renderSale(products);
}

window.addEventListener('load', loadSale);
const $productRegistBtn = document.querySelector(".product-regist-btn");
$productRegistBtn.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "../../src/html/product_register.html";
});