import { languages, classtypes, areas, moneys, shares, colors, types } from './res'
import './Date'

export default {
  async install (Vue) {
    Vue.prototype.$Res = {
      languages,
      classtypes,
      areas,
      moneys,
      shares,
      colors,
      types
    }
  }
}
