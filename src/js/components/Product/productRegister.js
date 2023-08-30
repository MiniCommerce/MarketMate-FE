import { API } from "../../utils/index.js";
import { storage } from "../../utils/index.js";
import { URL } from "../../data/index.js";


const token = storage.getSessionStorage("token")
const submitBtn = document.querySelector('#submit-btn');
const imageInput = document.querySelector('#image-input');


submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const amount = document.getElementById('amount').value;
    const desc = document.getElementById('desc').value;
    const status = document.getElementById('status').value;
    const uploadedImage = imageInput.files[0];

    const data = {
        category: category,
        product_name: name,
        price: price,
        amount: amount,
        desc: desc,
        status: status,
        // uploaded_images: [uploadedImage],
    }
    console.log(data)



    try {
        const productRegister = await API.apiAuthPost(URL.productRegisterURL, data, token);

        if (productRegister) {
            alert("상품을 등록했습니다")
        } else {
            alert("에러")
        }
    }
    catch (err) {
        alert(err);
    }


})
