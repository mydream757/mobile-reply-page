import Component from "../core/Component.js";
import LoginPage from "./LoginPage.js";

export class LoginButton extends Component{
    setup(){
        this.key = 'login-btn';
    }
    template(){
        return `
        <div key=${this.key} id="login-btn-container">
            <div id="login-btn">
                로그인하여 댓글쓰기
            </div>
        </div>    
        `
    }

    setEvent(){
        
        this.element.addEventListener('click', ()=>{
        
            document.querySelector('#dark-wall').classList.add('on');
            document.querySelector('#login-page').classList.add('on');
            document.querySelector('#login-page').classList.add('slidein');
        });
    }
}