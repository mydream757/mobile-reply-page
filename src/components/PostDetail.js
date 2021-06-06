import PostHeader from "../components/PostHeader.js";
import Component from "../core/Component.js";
import IconButton from "./IconButton.js";
import { getReplyList, getUserPositionReplyList, global, setReplyList, setUserPositionReplyList, SocialIcon } from "../Utils/utils.js"
import ReplyListItem from "./ReplyListItem.js";
import { LoginButton } from "./LoginButton.js";
import ReplyContainer from "./ReplyContainer.js";

export default class PostDetail extends Component{
    setup(){
        this.post_id = this.props.post_id;
        this.state = {
            title : "글의 제목",
            content : "글의 내용 ㅎㅎㅎㅎ",
            user_info : {
                user_id : "u1234672",
                user_name : "댓글러2",
                profile : "",
                platform : "kakao"
            },
            write_count : 12,
            reply_count : 5,
            published_at : new Date(2021,4,25,3,50),
        }
        if(global.user === undefined){
            this.state.reply_list = getReplyList();
        }else{
            this.state.reply_list = getUserPositionReplyList()
        }
        
        this.key = 'post-detail';
        
    }
    template(){
        const {title, content, reply_list, user_info, published_at, write_count} = this.state; 
        const platform_icon = SocialIcon(user_info.platform);
        let src = (user_info.profile === '' ? 'images/user.svg' : user_info.profile);
        
        return `
        <div key=${this.key}>
            <header id="post-detail-header"></header>
            <div id="post-detail-info">
                <div class="userprofile inline">
                    <img src="${src}" /> 
                </div> 
                <div class="userplatform-icon inline">
                    ${platform_icon}
                </div>
                <div class="username">${user_info.user_name}</div>
            </div>
            <div id="post-content-container">
                <div id="post-detail-title">
                    <p><b>${title} </b></p>
                </div>
                <div class="post-info">
                    <span class="publish-date">${published_at.toLocaleString()}</span>
                    <span class="write-count">조회 : ${write_count}</span>
                </div>
                <div class="write-count">
                    
                </div>
                <div id="post-detail-content">
                    <p>${content}</p>
                </div>
            </div>
            <hr/>
            <div id="reply-container">
                <div id="reply-more-btn">
                    <span>댓글${reply_list.length} </span>
                </div>
                <div id="reply-list-container">
                </div>
                <div id="register-reply-container">
                </div>
            </div>
            <div id="my-reply-container">
            </div>
        </div>`
        
    }
    mountChildren(){
        
        new PostHeader(document.querySelector('#post-detail-header'), { text : "헬렐레"})
        
        //로그인 유저가 없으면
        const replyListContainer = document.querySelector('#reply-container');
        const myReplyContainer = document.querySelector('#my-reply-container');

        const replyRegiHandler = (reply_data)=>{
            let reply_list = getUserPositionReplyList();
            reply_list.push(reply_data);
            setUserPositionReplyList(reply_list);
            this.setState({reply_list : reply_list});
            document.querySelector('#dark-wall').classList.remove('on');
        };
        const replyModiHandler = (reply_data)=>{
            let reply_list = getUserPositionReplyList();
            let index = reply_list.findIndex((item)=>item.reply_id === reply_data.reply_id);
            reply_list[index] = reply_data;
            setUserPositionReplyList(reply_list);
            this.setState({reply_list : reply_list});
            document.querySelector('#dark-wall').classList.remove('on');
        };
        const replyDelHandler = (id)=>{
            let reply_list = getUserPositionReplyList();
            let result = reply_list.filter((item)=>item.reply_id !== id);
            setUserPositionReplyList(result);
            this.setState({reply_list : result});
            document.querySelector('#dark-wall').classList.remove('on');
        };

        this.state.reply_list.map((reply_data)=>{
            new ReplyListItem(replyListContainer, {
                reply_data : reply_data,
                replyModiHandler : replyModiHandler.bind(this),
                replyDelHandler : replyDelHandler.bind(this)
            });
        })
        

        if(global.user==null){
            new LoginButton(myReplyContainer);
        }else{
            new ReplyContainer(myReplyContainer, {
                replyRegiHandler : replyRegiHandler.bind(this)
            });
        }
    }

    setEvent(){

    }

}
