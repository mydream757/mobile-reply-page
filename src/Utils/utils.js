export var global = {};

export function formatDate(date) { 
    var d = new Date(date), 
    month = '' + (d.getMonth() + 1), 
    day = '' + d.getDate(), year = d.getFullYear(); 
    
    if (month.length < 2) month = '0' + month; 
    if (day.length < 2) day = '0' + day; 
    
    return [year, month, day].join('-'); 

}

export function SocialIcon(platform_name){
    let platform_icon;
    switch(platform_name){
        case 'kakao':
            platform_icon = `
                <div class='icon-social-login' style='background:#FFEB00'>
                    <i class="xi-2x xi-kakaotalk text-dark"></i>
                </div>
                `
            break;
        case 'google':
            platform_icon = `
                <div class='icon-social-login' style='background:#D93025'>
                    <i class="xi-2x xi-google"></i>
                </div>
            `;
            break;
        case 'naver':
            platform_icon = `
                <div class='icon-social-login' style='background:#1FC700'>
                    <i class="xi-2x xi-naver"></i>
                </div>
                `;
            break;
        case 'facebook':
            platform_icon = `
                <div class='icon-social-login' style='background:#4267B2'>    
                    <i class="xi-2x xi-facebook"></i>
                </div>
                `;
            break;
        default:
            platform_icon = '';
            break;
    }
    return platform_icon;
}
export const fakeFetch = (delay = 1000) => new Promise(res=>setTimeout(res,delay));
export const INVALID_WORD = [
    "개객기",
    "노답",
    "머저리",
    "똥개"
];
export const checkInvalidWord = (string)=>{
    let checkedArray = [];
    for(let i in INVALID_WORD){
        let checked = string.match(INVALID_WORD[i]);
        if(checked!==null){
            checkedArray.push(checked[0]);
        }
    }
    return { isValid : checkedArray.length===0, result : checkedArray }; 
}
export const getInterval = function (otherDate) {
    let array = [1000, 60, 60, 24];
    let temp = ['방금', '분','시간', '일'];
    let newDate = new Date();
    let interval = newDate.getTime() - otherDate.getTime();
    let result = '';
    for(let i = 0; i<array.length; i++){
        interval /= array[i];
        if(i===array.length-1 && interval > 1){
            result = otherDate.toLocaleString();           
        }else if(i>0 && interval < array[i+1]){
            result = Math.floor(interval) + temp[i] + ' 전';
            break;
        }else if(i===0 && interval < array[i+1]){
            result = temp[i] + ' 전';
            break;
        }
    }
    return result;
}
export const checkTooOftenReply = ()=>{
    let replyList = getReplyList();
    const is2MinuteInterval = (published_at)=>{
        let newDate = new Date();
        let interval = newDate.getTime() - published_at.getTime();
        return interval / (1000 * 60) < 2;
    }

    replyList = replyList.filter(item=>
        item.user_info.user_id === global.user.user_id 
        && is2MinuteInterval(item.published_at)
    );
    return replyList.length === 0;
}
let dummyReplyList = [{
    user_info : {
        user_id : "u1234673",
        user_name : "댓글러1",
        profile : "",
        platform : "kakao"
    }, 
    reply_id : "r12352123", 
    reply_content : "hhhhhhhhhhhhhh", 
    published_at : new Date(2021,4,25,4,12), 
    reply_count : 0, 
    like_count : 3, 
    dislike_count : 2 
},
{
    user_info : {
        user_id : "u1234672",
        user_name : "댓글러2",
        profile : "",
        platform : "facebook"
    }, 
    reply_id : "r12352124", 
    reply_content : "hhhhhhhhhhhhhh", 
    published_at : new Date(2021,4,26,5,50), 
    reply_count : 0, 
    like_count : 5, 
    dislike_count : 0 
},
{
    user_info : {
        user_id : "u1234675",
        user_name : "댓글러3",
        profile : "",
        platform : "google"
    }, 
    reply_id : "r12352129", 
    reply_content : "재밌어요", 
    published_at : new Date(2021,4,26,5,50), 
    reply_count : 0, 
    like_count : 5, 
    dislike_count : 0 
},
{
    user_info : {
        user_id : "u1234671",
        user_name : "읭?",
        profile : "",
        platform : "naver"
    }, 
    reply_id : "r12352121", 
    reply_content : "ㅎㅎ", 
    published_at : new Date(2021,5,6,20,59), 
    reply_count : 0, 
    like_count : 5, 
    dislike_count : 1 
}];
let dummyUserPositionReplyList = [{
    user_info : {
        user_id : "u1234673",
        user_name : "댓글러1",
        profile : "",
        platform : "kakao"
    }, 
    reply_id : "r12352123", 
    reply_content : "hhhhhhhhhhhhhh", 
    published_at : new Date(2021,4,25,4,12), 
    reply_count : 0, 
    like_count : 3, 
    dislike_count : 2,
    is_like : false,
    is_dislike : true,
},
{
    user_info : {
        user_id : "u1234672",
        user_name : "댓글러2",
        profile : "",
        platform : "facebook"
    }, 
    reply_id : "r12352124", 
    reply_content : "hhhhhhhhhhhhhh", 
    published_at : new Date(2021,4,26,5,50), 
    reply_count : 0, 
    like_count : 5, 
    is_like : true,
    is_dislike : false,
    dislike_count : 0 
},
{
    user_info : {
        user_id : "u1234675",
        user_name : "댓글러3",
        profile : "",
        platform : "google"
    }, 
    reply_id : "r12352129", 
    reply_content : "재밌어요", 
    published_at : new Date(2021,4,26,5,50), 
    reply_count : 0, 
    like_count : 5, 
    dislike_count : 0,
    is_like : false,
    is_dislike : false,
},
{
    user_info : {
        user_id : "u1234671",
        user_name : "읭?",
        profile : "",
        platform : "naver"
    }, 
    reply_id : "r12352121", 
    reply_content : "ㅎㅎ", 
    published_at : new Date(2021,5,6,20,59), 
    reply_count : 0, 
    like_count : 5, 
    dislike_count : 0,
    is_like : true,
    is_dislike : false,
}];
export const getReplyList = ()=>{
    return dummyReplyList;
}
export const setReplyList = (list)=>{
    dummyReplyList = list;
}

export const getUserPositionReplyList = ()=>{
    return dummyUserPositionReplyList;
}
export const setUserPositionReplyList = (list)=>{
    dummyUserPositionReplyList = list;
}

