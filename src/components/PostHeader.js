import Component from "../core/Component.js";
import IconButton from "./IconButton.js";

export default class PostHeader extends Component{
    setup(){
        const { text } = this.props;
        this.state = {
            titleText : text
        };
        this.key = "back-btn";

    }
    
    template(){
        const { titleText } = this.state;
        
        return `
            <div key=${this.key}>
                <div id="back-btn" class="icon-btn">
                </div>
                
                <div id="hamburger-btn" class="icon-btn">
                </div>
            </div>
        `   
    }
    mountChildren(){
        new IconButton(document.querySelector('#back-btn'), { src : "images/left-arrow.svg"} );
        new IconButton(document.querySelector('#hamburger-btn'), { src : "images/more.svg"});
    }

}   