import Component from "../core/Component.js";

export default class IconButton extends Component{
    setup(){
    }
    template(){
        const { src, className } = this.props
        return `
            <img key=${className} src=${src} />
        `
    }
}