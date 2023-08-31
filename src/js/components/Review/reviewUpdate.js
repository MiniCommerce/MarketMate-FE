import { apiAuthPatch } from '../../utils/fetchAPI.js';
import { URL } from '../../data/index.js';
import { getSessionStorage } from '../../utils/storage.js';

const $updateButton = document.querySelector("#review-update-btn");

$updateButton.addEventListener("click", reviewUpdate)

const updatereview = getSessionStorage("currentReview")
const review = JSON.parse(updatereview);
console.log(review)
const scoreInput = document.querySelector("#update-score");
const descInput = document.querySelector("#review-update");
scoreInput.value = review.score;
descInput.value = review.desc;



async function reviewUpdate(event){
    event.preventDefault();

    const token = getSessionStorage("token"); 
    const data = {
        review_id : review.id,
        score : scoreInput.value,
        desc : descInput.value
    }
    try{
        await apiAuthPatch(URL.reviewUpdateURL, data, token);
        alert("리뷰가 수정 되었습니다.");
        window.location.href = "review.html";
    }catch (error){
        console.error("Error submitting review:", error);
        alert("리뷰 수정에 실패했습니다.");
    }
}