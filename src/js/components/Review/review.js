import { apiGet, apiAuthDelete,apiAuthGet } from '../../utils/fetchAPI.js';
import { URL } from '../../data/index.js';
import { getSessionStorage, setSessionStorage } from '../../utils/storage.js';

async function reviewlist() {
    const token = getSessionStorage("token");
    const product_id = getSessionStorage("product_id");
  
    try {
        const response = await apiGet(URL.reviewlistURL + product_id + "/", {});
        const currentUserID = token ? await apiAuthGet(URL.userDiscriminationURL, token) : -1;
        const reviewListElement = document.querySelector(".review-list");
        reviewListElement.innerHTML = ""; 
  
        for (const review of response) {
            console.log(review)
            const reviewContainer = document.createElement("div"); 

            const reviewWriter = document.createElement("li");
            reviewWriter.textContent = '작성자 : ' + review.buyer_name;
            reviewContainer.appendChild(reviewWriter);

            const reviewTime = document.createElement("li");
            reviewTime.textContent = '작성시간 : ' + formatDate(review.created_at);
            reviewContainer.appendChild(reviewTime);

            const reviewScore = document.createElement("li");
            reviewScore.textContent = '평점 : ' + review.score;
            reviewContainer.appendChild(reviewScore);

            const reviewDesc = document.createElement("li");
            reviewDesc.textContent = review.desc;
            reviewContainer.appendChild(reviewDesc);

            if (review.buyer === currentUserID.user_id) {
                const editButton = document.createElement("button");
                editButton.textContent = "수정";
                // 리뷰 수정
                editButton.addEventListener("click", () => {
                    setSessionStorage("currentReview", JSON.stringify(review));
                    window.location.href = "review_update.html";
                });
                reviewContainer.appendChild(editButton);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "삭제";
                // 리뷰 삭제 
                deleteButton.addEventListener("click", async () => {
                    try {
                        await apiAuthDelete(URL.reviewDeleteURL, { review_id: review.id }, token);
                        alert("리뷰가 삭제되었습니다.");
                        window.location.reload(); 
                    } catch (error) {
                        console.error("리뷰 삭제 실패", error);
                    }
                });
                reviewContainer.appendChild(deleteButton);
            }

            reviewListElement.appendChild(reviewContainer); 
        }
    } catch (error) {
        console.error("Error fetching response:", error);
    }
}


window.addEventListener("load", reviewlist);

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('ko-KR', options);
  }
