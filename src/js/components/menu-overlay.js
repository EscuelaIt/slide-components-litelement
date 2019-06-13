import { LitElement, html, css } from 'lit-element';
import { SlideDownMixin } from '../mixins/slide-down-mixin';


class MenuOverlay extends SlideDownMixin(LitElement) {

  static get properties() {
    return {
      opened: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.opened = false;
    this.doDocumentClick = this.close.bind(this);
  }

  static get styles() {
    return css`
    :host {
      position: relative;
    }
    .trigger {
      cursor: pointer;
    }
    section {
      border: 1px solid #ddd;
      padding: 15px;
      width: 300px;
      background-color: #eee;
    }
    .content {
      overflow: hidden;
      position: absolute;
      top: 5px;
      height: 0;
      transition: height 0.3s ease-in;
      -webkit-transition: height 0.3s ease-in;
      box-shadow: 6px 6px 12px #888;
      
    }
    `;
  }
  render() {
    return html`
      ${this.triggerTemplate}
      ${this.contentTemplate}
    `;
  }

  get triggerTemplate() {
    return html`
      <div class="trigger" @click="${this.toggle}">
        <slot name="trigger"></slot>
      </div>
    `;
  }

  get contentTemplate() {
    return html`
    <div id="content" class="content" @click="${ e => e.stopPropagation() }">
      <section>
        <slot></slot>
      </section>
    </div>
    `;
  }

  toggle(e) {
    e.stopPropagation();
    this.opened = !this.opened;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('connected')
    document.addEventListener('click', this.doDocumentClick);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this.doDocumentClick);
    super.disconnectedCallback();
  }

  close() {
    console.log('cierro el overlay', this)
    this.opened = false;
  }
  updated(changedProperties) {
    if(changedProperties.has('opened')) {
      console.log('tiene opened', this.opened)
      if(this.opened) {
        this.slideShow(this.content);
      } else {
        this.slideHide(this.content);
      }
    }
  }
  firstUpdated() {
    this.content = this.shadowRoot.getElementById('content');
  }
}
customElements.define('menu-overlay', MenuOverlay);
