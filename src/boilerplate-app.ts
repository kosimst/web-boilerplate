import {
  LitElement,
  html,
  css,
  property,
  PropertyValues,
  customElement
} from 'lit-element'
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'
import { installOfflineWatcher } from 'pwa-helpers/network.js'
import { installRouter } from 'pwa-helpers/router.js'
import { updateMetadata } from 'pwa-helpers/metadata.js'

import { render } from 'lit-html'

import '@polymer/iron-icon'
import '@polymer/iron-icons/social-icons'

// Import vaadin
import '@vaadin/vaadin-app-layout/theme/material/vaadin-app-layout.js'
import '@vaadin/vaadin-tabs/theme/material/vaadin-tabs'
import '@vaadin/vaadin-login/theme/lumo/vaadin-login-overlay'
import '@vaadin/vaadin-text-field/theme/lumo/vaadin-text-field'
import '@vaadin/vaadin-dialog'
import '@vaadin/vaadin-button/theme/lumo/vaadin-button'

// Import styles
import baseStyles from './styles/base-style.css'

// This element is connected to the Redux store.
import { store, RootState } from './store.js'

// These are the actions needed by this element.
import { navigate, updateOffline } from './actions/app.js'
import User from './classes/User'
import { signInUser } from './actions/user'

// Import themes to apply
import vaadinTabTheme from './styles/theme/vaadin-tab.css'
import vaadinButtonTheme from './styles/theme/vaadin-button.css'
import { applyTheme } from './functions/themer'
import { primary } from './constants/theme'

// Apply all themes
applyTheme('material-tab-custom', 'vaadin-tab', vaadinTabTheme)
applyTheme('vaadin-button-custom', 'vaadin-button', vaadinButtonTheme)

@customElement('boilerplate-app')
export class BoilerplateApp extends connect(store)(LitElement) {
  static get styles() {
    return [
      baseStyles,
      css`
        #background[opened] {
          position: absolute;
          top: 0;
          left: 0;

          width: 100vw;
          height: 100vh;

          z-index: 100;

          background-color: white;
        }

        main {
          width: 100%;
          height: 100%;
        }
      `
    ]
  }

  @property({ type: String })
  appTitle = ''

  @property({ type: String })
  private _currentView = ''

  @property({ type: Object })
  private _user: User | null = null

  protected render() {
    return html`
      <vaadin-dialog
        ?opened=${!this._user}
        .renderer=${this._renderDialog}
      ></vaadin-dialog>
      <div id="background" ?opened=${!this._user}></div>
      <vaadin-app-layout>
        <h3 slot="navbar touch-optimized">Home</h3>
        <vaadin-tabs orientation="vertical" slot="drawer">
          <vaadin-tab>
            <a href="/">
              <span>Home</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a href="/me">
              <span>Mein Account</span>
            </a>
          </vaadin-tab>
        </vaadin-tabs>
        <main>
          <view-home ?hidden=${this._currentView !== 'home'}></view-home>
          <view-me ?hidden=${this._currentView !== 'me'}></view-me>
          <view-notfound
            ?hidden=${this._currentView !== 'notfound'}
          ></view-notfound>
        </main>
      </vaadin-app-layout>
    `
  }

  constructor() {
    super()

    setPassiveTouchGestures(true)
  }

  protected firstUpdated() {
    installRouter(location =>
      store.dispatch(navigate(decodeURIComponent(location.pathname)))
    )
    installOfflineWatcher(offline => store.dispatch(updateOffline(offline)))
    installMediaQueryWatcher(`(min-width: 460px)`, () => {})
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._currentView
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      })
    }
  }

  protected _renderDialog = (root: HTMLElement) => {
    // @ts-ignore
    root.shadowRoot.children[2].children[0].style.padding = '0'
    render(
      html`
        <style>
          * {
            cursor: pointer;
            user-select: none;
          }

          header {
            width: calc(100% - 48px);

            background-color: ${primary};
            color: white;

            padding: 24px;
          }

          h2 {
            margin: 0;
          }

          footer {
            padding: 24px;
          }
        </style>
        <header>
          <h2>Hi.</h2>
          <span>Wir kennen uns wohl noch nicht?</span>
        </header>
        <footer>
          <p>Um dieses Service zu nutzen, ist ein Account erforderlich.</p>
          <p>Melde dich dazu einfach hier mit Google an.</p>
          <vaadin-button @click=${this._signIn} theme="primary"
            >Anmelden</vaadin-button
          >
        </footer>
      `,
      root
    )
  }

  protected _signIn() {
    store.dispatch(signInUser())
  }

  stateChanged(state: RootState) {
    this._currentView = state.app!.currentView

    this._user = state.user!.user
  }
}
