import { apiAuthGet } from "../../utils/fetchAPI.js";
import { URL } from "../../data/index.js";
import { getSessionStorage } from '../../utils/storage.js';

async function fetchOrders() {
    try {
      const token = getSessionStorage("token");
      const response = await apiAuthGet(URL.buyerOrderURL, token);
      
      if (response) {
        return response;
      } else {
        console.error('Error fetching orders:', response);
        return [];
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  function renderOrders(orders) {
    const tableBody = document.querySelector('#order-table tbody');

    orders.forEach(order => {
        const row = document.createElement('tr');
        
        const productImgCell = document.createElement('td');
        const img = document.createElement('img');
        const imgsrc = order.product_images[0]; 
        const formattedImgSrc = imgsrc.replace('/media/', '');
        img.src = `http://127.0.0.1:8000/${formattedImgSrc}`;
        img.alt = 'Product Image';
        productImgCell.appendChild(img);
        row.appendChild(productImgCell);

        const productNameCell = document.createElement('td');
        productNameCell.textContent = order.order_name;
        row.appendChild(productNameCell);

        const orderDateCell = document.createElement('td');
        orderDateCell.textContent = formatDate(order.created_at);
        row.appendChild(orderDateCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = order.price;
        row.appendChild(priceCell);

        const addressCell = document.createElement('td');
        addressCell.textContent = order.address;
        row.appendChild(addressCell);

        const deliveryStatusCell = document.createElement('td');
        deliveryStatusCell.textContent = order.status;
        row.appendChild(deliveryStatusCell);

        tableBody.appendChild(row);
    });
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('ko-KR', options);
  }

async function loadOrders() {
    const orders = await fetchOrders();
    renderOrders(orders);
}

window.addEventListener('load', loadOrders);