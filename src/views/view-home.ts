import { html, customElement } from 'lit-element'
import { BoilerplateView } from '../components/boilerplate-view.js'

@customElement('view-home')
export class ViewHome extends BoilerplateView {
  static get styles() {
    return []
  }

  protected render() {
    return html`
      <h1>Hey there!</h1>
      <h3>Welcome Web Boilerplate.</h3>
    `
  }
}
