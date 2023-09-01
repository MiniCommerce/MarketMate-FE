import { API } from "../../utils/index.js";
import { URL } from "../../data/index.js";
import { storage } from "../../utils/index.js";
import { goToLogin } from "../Home/home.js";

const $questionContainer = document.querySelector(".question-container")
const token = storage.getSessionStorage("token");
const user_id = parseInt(storage.getSessionStorage("user_id"));
const member = storage.getSessionStorage("member");
let seller_id = "";

function set_seller_id(id) {
    seller_id = id;
}
async function question_update(obj, data, member) {
    try {
        let send_data = {
            question_id: data.id
        };
        
        if (member === "buyer") {
            send_data["desc"] = obj.value;
        }
        else {
            send_data["answer"] = obj.value;
        }

        const res = await API.apiAuthPatch(URL.questionUpdateURL, send_data, token);
        console.log(res)
        obj.innerText = res.desc;
    } catch (err) {
        console.log(err);
    }

}

async function question_delete(obj, question_id) {
    try {
        const data = {
            question_id: question_id
        }
        const res = await API.apiAuthDelete(URL.questionDeleteURL, data, token);
        
        obj.remove();
    } catch (err) {
        console.log(err);
    }

}

function create_question_card(data) {
    const $cardContainer = document.createElement("div");
    const $ulTag = document.createElement("ul");
    const $questionDesc = document.createElement("textarea");
    const $questionAnswer = document.createElement("textarea");
    const $questionUpdateBtn = document.createElement("button");
    const $questionDeleteBtn = document.createElement("button");

    $cardContainer.setAttribute("class", "question-item");

    const $liTag1 = document.createElement("li");
    const $pTag1 = document.createElement("p");
    $pTag1.innerText = "문의글";
    $liTag1.append($pTag1);
    $ulTag.append($liTag1);

    const $liTag2 = document.createElement("li");
    $questionDesc.innerText = data.desc;
    $liTag2.append($questionDesc);
    $ulTag.append($liTag2);

    const $liTag3 = document.createElement("li");
    const $pTag2 = document.createElement("p");
    $pTag2.innerText = "답글";
    $liTag3.append($pTag2);
    $ulTag.append($liTag3);

    const $liTag4 = document.createElement("li");
    $questionAnswer.innerText = data.answer;
    $liTag4.append($questionAnswer);
    $ulTag.append($liTag4);
    
    $cardContainer.append($ulTag);
    
    $questionDesc.readOnly = true;
    $questionAnswer.readOnly = true;

    // 로그인 유저
    if (member) {
        // 일반회원
        if (member === "buyer") {
            if (user_id && user_id === data.user) {
                $questionDesc.readOnly = false;
                $questionUpdateBtn.innerText = "수정";
                $questionDeleteBtn.innerText = "삭제";
        
                $questionUpdateBtn.addEventListener("click", function() {
                    const obj = $questionDesc;
                    const data2 = data;
        
                    question_update(obj, data2, member);
                });
        
                $questionDeleteBtn.addEventListener("click", function() {
                    const obj = $cardContainer;
                    const id = data.id;
        
                    question_delete(obj, id);
                });
        
                $cardContainer.append($questionUpdateBtn, $questionDeleteBtn);
            }
        }
        // 판매회원
        else {
            if (user_id && user_id === seller_id) {
                $questionAnswer.readOnly = false;
                $questionUpdateBtn.innerText = "답글";

                $questionUpdateBtn.addEventListener("click", function() {
                    const obj = $questionAnswer;
                    const data2 = data;
        
                    question_update(obj, data2, member);
                });

                $cardContainer.append($questionUpdateBtn);
            }
        }

    }

    return $cardContainer;
}

async function get_question_list(product_id) {
    $questionContainer.innerHTML = "";
    const url = `${URL.questionListURL}?product_id=${product_id}`;
    
    try {
        const res = await API.apiGet(url);
        
        for (let i = 0; i < res.length; i++) {
            const data = res[i];
            const $questionItem = create_question_card(data);
      
            $questionContainer.append($questionItem);
          }
    } catch (err) {
        console.log(err);
    }
}

async function write_question(product_id) {
    
    // 비로그인 유저
    if (!(user_id)) {
        goToLogin();
        return;
    }

    const $textArea = document.querySelector("#question-desc");
    const desc = $textArea.value;
    
    if (desc) {
        const data = {
            product_id: product_id,
            desc: desc
        };
        
        try {
            const res = await API.apiAuthPost(URL.questionWriteURL, data, token);
            
            if (res) {
                $textArea.value = "";
                alert("문의가 등록되었습니다.");
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export { get_question_list, write_question, set_seller_id }