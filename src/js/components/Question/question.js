import { API } from "../../utils/index.js";
import { URL } from "../../data/index.js";
import { storage } from "../../utils/index.js";

const $questionContainer = document.querySelector(".question-container")
const token = storage.getSessionStorage("token");

async function question_update(obj, data) {
    try {        
        const send_data = {
            question_id: data.id,
            desc: obj.value
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
    // const $buyerEmail = document.createElement("p");
    const $questionDesc = document.createElement("textarea");
    const $questionAnswer = document.createElement("p");
    const $questionUpdateBtn = document.createElement("button");
    const $questionDeleteBtn = document.createElement("button");

    $cardContainer.setAttribute("class", "question-item");
    
    $questionDesc.innerText = data.desc;
    $questionAnswer.innerText = data.answer;
    $questionUpdateBtn.innerText = "수정";
    $questionDeleteBtn.innerText = "삭제";

    $questionUpdateBtn.addEventListener("click", function() {
        const obj = $questionDesc;
        const data2 = data;

        question_update(obj, data2);
    });

    $questionDeleteBtn.addEventListener("click", function() {
        const obj = $cardContainer;
        const id = data.id;

        question_delete(obj, id);

    });
    $cardContainer.append($questionDesc, $questionAnswer, $questionUpdateBtn, $questionDeleteBtn)

    return $cardContainer
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

async function write_question(product_id, token) {
    const data = {
        product_id: product_id,
        desc: "질문1"
    };
    
    try {
        const res = await API.apiAuthPost(URL.questionWriteURL, data, token);
        const question_data = res;
        const $questionItem = create_question_card(question_data);
    
        $questionContainer.append($questionItem);
        
    } catch (err) {
        console.log(err);
    }
}

export { get_question_list, write_question }