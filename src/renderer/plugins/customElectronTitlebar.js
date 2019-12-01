import path from 'path'
import normalize from 'normalize-path'

const customElectronTitlebar = require('custom-electron-titlebar')


export default new customElectronTitlebar.Titlebar({

  backgroundColor: customElectronTitlebar.Color.fromHex('#555'),
  icon: normalize(path.join(__static, 'assets/image/ico_eri_16.png')),
  overflow: 'hidden',

})