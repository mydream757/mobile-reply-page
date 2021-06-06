import Component from "../core/Component.js";
import { checkInvalidWord, checkTooOftenReply, global, INVALID_WORD, SocialIcon } from "../Utils/utils.js";

export default class ReplyContainer extends Component{
    setup(){
        this.state = {
            user_info : global.user
        };
        this.key = 'my-reply-container';
    }
    template(){
        const {user_info} = this.state;
        const platform_icon = SocialIcon(user_info.platform);
        let src = (user_info.profile === '' ? 'images/user.svg' : user_info.profile);
          
        return `
            <div key=${this.key} id="reply-register-container">
                <div id="info-container">
                    <div id="my-info" class="">
                        <div class="userprofile" >
                            <img src="${src}" /> 
                        </div>
                        <div class="userplatform">
                            ${platform_icon}
                        </div>
                        <span class="username">${user_info.user_name}</span> 
                        
                    </div>
                </div>
                
                <textarea id="reply-input-text" placeholder="댓글 작성 시 상대방에 대한 배려와 책임을 담아주세요."></textarea>
                <div id="err-noti">
                </div>
                <div id="reply-register-btn">
                    <span>댓글 등록</span>
                </div>
            </div>`
    }
    setEvent(){
        const {replyRegiHandler} = this.props;

        const replyInput = this.element.querySelector('#reply-input-text');
        replyInput.addEventListener('focusin', (e)=>{
            this.parent.classList.add('reply-slidein');
            document.querySelector('#dark-wall').classList.add('on');
        })
        document.querySelector('#dark-wall').addEventListener('click', (e)=>{
            resetReplyInput();
        })
        const resetReplyInput = ()=>{
            replyInput.classList.remove('is-err');
            this.parent.classList.remove('reply-slidein');
            this.element.querySelector('#err-noti').innerText = '';
            replyInput.value = '';
        }
        
        this.element.querySelector('#reply-register-btn').addEventListener('click', (e)=>{
            const {isValid, result } = checkInvalidWord(replyInput.value);
            //금지어 체크
            if(isValid){
                //도배 방지
                if(checkTooOftenReply()){
                    //댓글 등록
                    replyRegiHandler({
                        user_info : global.user, 
                        reply_id : "r" + Math.floor(Math.random() * 1000000), 
                        reply_content : replyInput.value, 
                        published_at : new Date(), 
                        reply_count : 0, 
                        like_count : 0, 
                        dislike_count : 0 

                    });
                }else{
                    this.element.querySelector('#err-noti').innerText = "2분 이내에 새로 등록할 수 없습니다.";
                    replyInput.classList.add('is-err');
                }
                
            }else{
                let err_noti = '금칙어 ';
                for(let i in result){
                    err_noti += `"${result[i]}"`
                    if(i<result.length-1) err_noti += ',';
                }
                err_noti += '는 사용하실 수 없습니다.';
                this.element.querySelector('#err-noti').innerText = err_noti;
                replyInput.classList.add('is-err');
            }
        });
    }
} 