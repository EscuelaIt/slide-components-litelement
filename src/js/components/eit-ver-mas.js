import { LitElement, html, css } from 'lit-element';
import { SlideDownMixin } from '../mixins/slide-down-mixin';

class EitVerMas extends SlideDownMixin(LitElement) {
  static get properties() {
    return {
      opened: { type: Boolean },
      targetHeight: { type: String },
    }
  }
  
  constructor() {
    super();
    this.targetHeight = '120px';
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .closed {
        padding: 0px;
        margin-bottom: 0px;
      }
      #content {
        overflow: hidden;
        transition: height 0.3s ease-in;
        -webkit-transition: height 0.3s ease-in;
      }
      nav {
        padding-top: 6px;
        cursor: pointer;
        text-align: center;
        font-size: 0.8em;
        color: #888;
        font-weight: bold;
        border-top: 3px solid #eee;
      }
      .vermasopen span {
        opacity: 0.6;
        position: relative;
        padding: 10px;
      }
      .vermasclose span{
        position: relative;
        padding: 10px;
      }
      .vermasclose span::before {
        content: '';
        border-style: solid;
        border-width: 8px 12px 8px 0;
        border-color: transparent #888 transparent transparent;
        position: absolute;
        left: -15px;
        top: 10px;
        transform: rotate(-90deg);
      }

      .vermasopen span::before {
        content: '';
        border-style: solid;
        border-width: 8px 12px 8px 0;
        border-color: transparent #888 transparent transparent;
        position: absolute;
        left: -15px;
        top: 10px;
        transform: rotate(90deg);
      }
    `;
  }

  render() {
    return html`
    <style>
    #content {
        height: ${this.targetHeight};
    }
    </style>
    <div id="content">
      <slot></slot>
    </div> 
    <nav @click="${this.toggle}" class="${this.opened ? 'vermasopen' : 'vermasclose'}">
      <span>
        ${this.opened
          ? 'Ver menos'
          : 'Ver más'
        }  
      </span>
    </nav>
    `;
  }

  firstUpdated() {
    this.content = this.shadowRoot.getElementById('content');
    //this.finalHeight = this.content.
  }

  toggle() {
    console.log('toggle')
    this.opened = !this.opened;
    if(this.opened) {
      this.slideShow(this.content, this.targetHeight);
    } else {
      this.slideHide(this.content, this.targetHeight);
    }
  }
}
customElements.define('eit-ver-mas', EitVerMas);