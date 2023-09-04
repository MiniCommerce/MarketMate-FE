import { apiAuthGet,apiAuthPost } from "../../utils/fetchAPI.js";
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
        const imgsrc = order.product_images; 
        img.src = `${imgsrc}`;
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

        if(order.status == 'paid'){
        const refundCell = document.createElement('td');
        const refundButton = document.createElement('button');
        refundButton.classList.add('submit-button');
        refundButton.textContent = '환불';
        refundButton.addEventListener('click', () => {
            cancelPay(order.purchase
              .imp_uid, order.purchase
              .merchant_uid);
        });
        refundCell.appendChild(refundButton);
        row.appendChild(refundCell);
        }
        tableBody.appendChild(row);
    });
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('ko-KR', options);
  }

  function cancelPay(imp_uid, merchant_uid) {
    const token = getSessionStorage("token");
    let data = {
        imp_uid: imp_uid,
        merchant_uid: merchant_uid,
        reason: "테스트 결제 환불"
    };

    apiAuthPost(URL.refundURL, data, token)
        .then(response => {
            if (response.message === 'Refund successful') {
                alert('환불이 성공적으로 처리되었습니다.');
                location.reload(); 
            } else {
                console.error('Refund failed:', response);
            }
        })
        .catch(error => {
            console.error('Error refunding:', error);
        });
}

    

async function loadOrders() {
    const orders = await fetchOrders();
    renderOrders(orders);
}

window.addEventListener('load', loadOrders);
