import { apiAuthPost} from '../../utils/fetchAPI.js';
import { URL } from '../../data/index.js';
import { getSessionStorage,removeSessionStorage } from '../../utils/storage.js';
import { home } from "../Home/index.js";

const $deleteBtn = document.querySelector("#user_delete_btn");

async function deleteUser() {
    const token = getSessionStorage("token");
    const password = document.getElementById("password1").value;

    try {
        const confirmDelete = confirm("정말로 탈퇴하시겠습니까?");
        if (!confirmDelete) {
            return;
        }

        const response = await apiAuthPost(URL.deleteUserURL, { password: password }, token);
        console.log(response)
        if (response.status === 200) {
            alert("회원 탈퇴가 완료되었습니다.");
            removeSessionStorage("token");
            home.goToHome();
            logout();
        } else {
            alert("회원 탈퇴 실패");
        }
    } catch (err) {
        console.log(err);
    }
}

$deleteBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const password = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;

    if (password !== password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    deleteUser();
});