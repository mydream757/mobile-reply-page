import LoginPage from "./components/LoginPage.js";
import PostDetail from "./components/PostDetail.js";
import Component from "./core/Component.js";
import { global } from "./Utils/utils.js";

export default class App extends Component{
    setup(){
        //포스트 데이터 세팅
        //댓글 데이터 세팅
        if(global.user==undefined){
            this.state = { user_info : {}};
        }else{
            this.state = { user_info : global.user};
        }
        
    }
    template(){
        this.key='main';
        return `
            <div key=${this.key} style="position:relative">
                <div id="post-detail-page"></div>
                <div id="login-container">
                </div>
                <div id="dark-wall">
            </div>
            `
    }
    mountChildren(){
        new PostDetail(document.querySelector('#post-detail-page'), { post_id : "012345"})
        
    }
    setEvent(){

        document.querySelector('#dark-wall').addEventListener('click', (e)=>{
            e.target.classList.remove('on');
        })
    }
    afterRender(){
        /*
        global.user = {
            name : ""
        }*/
        const login_callback = (user_data)=>{
            global.user = user_data;
            this.setState({user_info : user_data});
            document.querySelector('#dark-wall').classList.remove('on');
        }
        if(global.user === undefined){
            global.user = null;
            const container = document.querySelector('#login-container');
            new LoginPage(container, {login_handler : login_callback.bind(this)});
        }
    }

}
