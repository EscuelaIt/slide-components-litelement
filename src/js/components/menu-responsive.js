import { LitElement, html, css } from 'lit-element';

import { SlideDownMixin } from '../mixins/slide-down-mixin';

class MenuResponsive extends SlideDownMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .menu-desktop {
        display: none;
      }
      .menu-mobile {
        overflow: hidden;
        height: 0;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        background-color: #f5f5f5;
        transition: height 0.3s ease-in;
        -webkit-transition: height 0.3s ease-in;
        border-bottom: 1px solid #ddd;
      }
      .menu-mobile-container {
        padding: 5px 0px 5px;
      }
      .menu-clear {
        margin: 15px 15px 0px;
        text-align: right;
      }
      .menu-trigger {
        margin-top: -5px;
      }

      @media(min-width: 700px) {
        .menu-desktop {
          display: block;
        }
        .menu-trigger, .menu-mobile {
          display: none;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="menu-desktop">
        <slot name="menu-desktop"></slot>
      </div>
      <div class="menu-trigger" @click="${this.onMenuOpen}">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
      </div>
      <div class="menu-mobile" id="menu">
        <div class="menu-mobile-container">
          <div class="menu-clear" @click="${this.onMenuClose}">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
          <slot name="menu-mobile"></slot>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this.menu = this.shadowRoot.getElementById('menu');
  }

  onMenuOpen() {
    this.slideShow(this.menu);
  }
  onMenuClose() {
    this.slideHide(this.menu);
  }
}
customElements.define('menu-responsive', MenuResponsive);