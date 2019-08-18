import { CSSResult, html } from 'lit-element'
import '@polymer/polymer/lib/elements/dom-module.js'
import { render } from 'lit-html'

/**
 * Applies given theme to a vaadin component
 * @param name Name if the module
 * @param target Targeted vaadin-component
 * @param style Styles to apply
 */
export const applyTheme = (name: string, target: string, style: CSSResult) => {
  const content = html`
    <template>
      <style>
        ${style.cssText}
      </style>
    </template>
  `
  const domModule = document.createElement('dom-module')

  domModule.id = name
  domModule.setAttribute('theme-for', target)

  render(content, domModule)
  document.head.appendChild(domModule)
}
