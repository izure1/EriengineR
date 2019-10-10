import path from 'path'

const customElectronTitlebar = require('custom-electron-titlebar')


export default new customElectronTitlebar.Titlebar({

  backgroundColor: customElectronTitlebar.Color.fromHex('#555'),
  icon: path.join(__static, 'assets/image/ico_eri_16.png').replace(/\\/g, '/'),
  overflow: 'hidden',

})