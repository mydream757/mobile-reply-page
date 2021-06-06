export default class Component {
    parent;
    props;
    state;
    constructor (parent, props) {
      this.parent = parent;
      this.props = props;
      this.element = null;
      this.key=null;
      this.setup();
      this.render();
    }
    setup () {};
    mountChildren(){};
    template () { return ''; }
    render () {
      this.bindElement();

      if(this.element === null){
        this.parent.innerHTML += this.template();
          
      }else{
        this.element.outerHTML = this.template();
      }
      this.bindElement();
      this.mountChildren();
      this.setEvent();
      this.afterRender();
    }
    afterRender(){}
    bindElement(){
        this.element = this.parent.querySelector(`[key="${this.key}"]`);
    }
    setEvent () {

    }
    setState (newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }
  }