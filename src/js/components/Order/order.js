import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";


const $orderId = document.querySelector("#id");
const $orderName = document.querySelector("#order-name");
const $price = document.querySelector("#price");
const $buyerName = document.querySelector("#buyer-name");
const $address = document.querySelector("#address");
const $email = document.querySelector("#email");
const $phone = document.querySelector("#phone");
const $purchaseTypes = document.querySelectorAll("input[type=radio]");

const $purchaseBtn = document.querySelector("#purchase-btn");
const $cancelBtn = document.querySelector("#cancel-btn");

const token = storage.getSessionStorage("token");
var purchaseType = "card";

// HTML 문서 전체가 로드 되었을 때의 이벤트
async function orderOnload(event) {
  try {
    // 주문 내역서 출력
    const res = await API.apiAuthGet(`${URL.orderURL}?order_id=${storage.getSessionStorage("order_id")}`, token);
    if (res !== undefined) {
        $orderId.innerText = `${res.id}`;
        $orderName.value = `${res.order_name}`;
        $price.value = `${res.price}`;
        $buyerName.value = `${res.buyer_name}`;
        $address.value = `${res.address}`;
        $email.value = `${res.buyer_email}`;
        $phone.value = `${res.buyer_phone}`;
    }

    // 결제 수단 선택 기능
    $purchaseTypes.forEach((radio) => {
      radio.addEventListener("change", async (event) => {
        if (radio.checked) {
          purchaseType = radio.value;
        }
      });
    });
  } catch (err) {
      alert(err);
  }
}

// 구매 버튼 클릭 시 이벤트
async function startPurchase(event) {
  // 중복되지 않는 상점 거래 ID 생성
  const merchantUID = `merchant-${self.crypto.randomUUID()}`.slice(0, 39);

  try {
    // 결제 사전 등록을 위한 데이터
    const data = {
      order_id: $orderId.innerText,
      merchant_uid: merchantUID,
      price: parseInt($price.value),
      purchase_type: purchaseType
    }
    
    // 결제 사전 등록(개발 서버, 포트원 API 서버)
    const res = await API.apiAuthPost(URL.prepurchaseURL, data, token);
    if (res !== undefined) {
      // 실결제를 위한 초기화
      var IMP = window.IMP;
      IMP.init("imp27521302");
      
      // 실결제 시작
      IMP.request_pay({
        pg: "nice",
        pay_method: purchaseType,
        merchant_uid: merchantUID,
        name: $orderName.value,
        amount: parseInt($price.value),
        buyer_email: $email.value,
        buyer_name: $buyerName.value,
        buyer_tel: $phone.value
      }, (rsp) => {
        // 결제 성공시
        if (rsp.success) {
          var msg = `
          결제가 완료되었습니다.\n
          고유 ID: ${rsp.imp_uid}\n
          상점 거래 ID: ${rsp.merchant_uid}\n
          결제 금액: ${rsp.paid_amount}\n
          카드 승인번호: ${rsp.apply_num}\n
          상태: ${rsp.status}`;

          alert(msg);

          // 결제 사전 등록된 데이터 수정(결제 성공 데이터)
          const successData = {
            order_id: $orderId.innerText,
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
            status: rsp.status
          }

          const updatePurchase = API.apiAuthPatch(URL.postpurchaseURL, successData, token);

          if (updatePurchase !== undefined) {
            storage.removeSessionStorage("order_id");
            location.href = "../../src/html/purchase_complete.html";
          } else {
            alert("결제는 완료되었으나 DB 저장 중 에러가 발생했습니다.");
          }
        } else {
          alert(rsp.error_msg);
        }
      });
    }
  } catch (err) {
      alert(err);
  }
}

// HTML 문서 전체가 로드 되었을 때 이벤트 등록
document.addEventListener("DOMContentLoaded", orderOnload);
// 구매 버튼 클릭 시 이벤트 등록
$purchaseBtn.addEventListener("click", startPurchase);