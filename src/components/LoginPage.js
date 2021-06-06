import Component from "../core/Component.js";
import { fakeFetch } from "../Utils/utils.js";

export default class LoginPage extends Component{
    setup(){
        this.key = 'login-page';
    }
    template(){
        return `
            <div key=${this.key} id="login-page">
                <div class="header"><span class="red">SNS</span>로그인해서 댓글 쓰기</div>
                <div id="kakao_login" class='social-login-btn'  style='background:#FFEB00'>
                    <i class="xi-2x xi-kakaotalk text-dark"></i>
                    <span class="black">카카오로 로그인</span>
                </div>
                <div id="google_login" class='social-login-btn'  style='background:#D93025'>
                    <i class="xi-2x xi-google"></i>
                    <span>구글로 로그인</span>
                </div>
                <div id="naver_login" class='social-login-btn' style='background:#1FC700'>
                    <i class="xi-2x xi-naver"></i>
                    <span>네이버로 로그인</span>
                </div>
                <div id="facebook_login" class='social-login-btn' style='background:#4267B2'>    
                    <i class="xi-2x xi-facebook"></i>
                    <span>페이스북으로 로그인</span>
                </div>
            </div>`
    }
    setEvent(){
        document.querySelector('#dark-wall').addEventListener('click', ()=>{
            this.element.classList.remove('slidein');
        });
        const login_handler = this.props.login_handler;
        let dummyUser = {
            user_id : "u234123",
            user_name : "Joonyoung Choi",
            profile : ""
        }

        //social-login-btn events
        this.element.querySelector('#kakao_login').addEventListener('click', async ()=>{
            await fakeFetch();
            dummyUser.platform = "kakao";
            login_handler(dummyUser);
        });
        this.element.querySelector('#google_login').addEventListener('click', async ()=>{
            await fakeFetch();
            dummyUser.platform = "google";
            login_handler(dummyUser);
        });
        this.element.querySelector('#naver_login').addEventListener('click', async ()=>{
            await fakeFetch();
            dummyUser.platform = "naver";
            login_handler(dummyUser);
        });
        this.element.querySelector('#facebook_login').addEventListener('click', async ()=>{
            await fakeFetch();
            dummyUser.platform = "facebook";
            login_handler(dummyUser);
        });
    }
}