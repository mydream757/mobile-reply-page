import Component from "../core/Component.js";
import { checkInvalidWord, getInterval, global, SocialIcon } from "../Utils/utils.js";

export default class ReplyListItem extends Component{
    setup(){
        const { reply_data } = this.props;
        this.key = reply_data.reply_id;
        const { user_info } = reply_data;
        let isMine;
        if(global.user!==undefined) isMine = user_info.user_id === global.user.user_id;
        else isMine = false;

        this.state = {
            isMine : isMine,
            isModify : false
        }

    }
    template(){
        const { reply_data } = this.props;
        const { user_info,reply_id,published_at,reply_content, reply_count, like_count,dislike_count,is_like, is_dislike } = reply_data;
        const platform_icon = SocialIcon(user_info.platform);
        let src = (user_info.profile === '' ? 'images/user.svg' : user_info.profile);

        return `
            <div class="reply-list-item" key=${this.key} id="${reply_id}">
                ${ (this.state.isMine && !this.state.isModify) ? 
                    `<div class="h-btn-group">
                        <div id="reply-mod-btn" class="text-btn">수정</div>
                        <div id="reply-del-btn"class="text-btn">삭제</div>
                    </div>` : ''
                }
                ${ (this.state.isMine && this.state.isModify) ? 
                    `<div class="h-btn-group">
                        <div id="reply-ok-btn" class="text-btn">확인</div>
                        <div id="reply-cancel-btn"class="text-btn">취소</div>
                    </div>` : ''
                }
                <div class="divide" style="padding-top:0.2rem">
                    <div class="reply-line">
                        <img  src="images/reply-line.svg" />
                    </div>
                    <div class="userprofile" >
                        <img src="${src}" />
                    </div> 
                </div>
                <div class="divide reply-right">
                    <div class="userplatform-icon">
                        ${platform_icon}
                    </div>
                    <span class="username">${user_info.user_name}</span> 
                    <span class="published-at">${getInterval(published_at)}</span>
                    <div class="reply-content">
                    ${ !this.state.isModify ? 
                        `<p>${reply_content}</p>` : ''}
                    ${ this.state.isModify ? 
                        `<textarea id="reply-mod-input">${reply_content}</textarea><div id="err-noti"></div>` : '' }

                    </div>
                    <div class="btn-group">
                        <div class="btn-sub-left-group" style="margin-left : 0">
                            <button id="reply-btn" class="icon-text-btn">
                                <img src="images/speech-bubble.svg" />
                                <span>${reply_count}</span>
                            </button>
                        </div>
                        <div class="btn-sub-right-group" style="margin-right : 0">
                            <button id="favorite-btn" class="icon-text-btn ${is_like !== undefined ? is_like : ''}">
                                <img src="images/like.svg" />
                                <span>${like_count}</span>
                            </button>
                            <button id="dislike-btn" class="icon-text-btn ${is_dislike !== undefined ? is_dislike : ''}">
                                <img src="images/thumb-down.svg" />
                                <span>${dislike_count}</span>
                            </button>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    setEvent(){
        this.element.querySelector('#favorite-btn').addEventListener('click', ()=>{

        });
        this.element.querySelector('#dislike-btn').addEventListener('click', ()=>{
            
        });
        if(this.state.isMine){
            if(this.state.isModify){
                const {replyModiHandler} = this.props;
                this.element.querySelector('#reply-ok-btn').addEventListener('click', ()=>{
                    let modInput = this.element.querySelector('#reply-mod-input');
                    const {isValid, result } = checkInvalidWord(modInput.value);

                    if(isValid){
                        //댓글 등록
                        replyModiHandler({
                            ...this.props.reply_data,
                            reply_content : modInput.value
                        })
                        this.setState({reply_data : {
                            ...this.props.reply_data,
                            reply_content : modInput.value
                        }})
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
                this.element.querySelector('#reply-cancel-btn').addEventListener('click', ()=>{
                    this.setState({isModify : false});
                });
            }else{
                const {replyDelHandler} = this.props;
                this.element.querySelector('#reply-mod-btn').addEventListener('click', ()=>{
                    this.setState({isModify : true});
                });
                this.element.querySelector('#reply-del-btn').addEventListener('click', ()=>{
                    replyDelHandler(this.key);
                });
            }
            
        }
        
    }


}