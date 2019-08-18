import { html, customElement } from 'lit-element'
import { BoilerplateView } from '../components/boilerplate-view.js'
import baseStyle from '../styles/base-style.css.js'

@customElement('view-me')
export class ViewMe extends BoilerplateView {
  static get styles() {
    return [baseStyle]
  }

  protected render() {
    return html`
      <h1>Hi!</h1>
      <h3>Welcome to the me-view.</h3>
    `
  }
}
