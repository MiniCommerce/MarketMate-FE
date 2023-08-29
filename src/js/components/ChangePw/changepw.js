import { apiAuthPost} from '../../utils/fetchAPI.js';
import { URL } from '../../data/index.js';
import { getSessionStorage } from '../../utils/storage.js';
import { home } from "../Home/index.js";
import { logout } from '../Logout/logout.js';

const $changeBtn = document.querySelector("#changepw-btn");

async function changepw() {
    const token = getSessionStorage("token");
    const current_password = document.getElementById("password1").value;
    const new_password = document.getElementById("password3").value;

    try {
        const response = await apiAuthPost(URL.changePassWordURL, { current_password: current_password, new_password: new_password }, token);
        console.log(response)
        if (response.status === 200) {
            alert("비밀번호가 변경되었습니다.");
            home.goToHome();
        } else {
            alert("비밀번호 변경 실패");
        }
    } catch (err) {
        console.log(err);
    }
}

$changeBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const password = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;

    if (password !== password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    changepw();
});