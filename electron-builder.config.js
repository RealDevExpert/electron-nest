/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  appId: 'com.nzsensing.tools.electron-nest-template',
  productName: '导热系数系统控制',
  asar: true,
  directories: {
    output: 'release/${buildVersion}',
  },
  npmRebuild: true,
  files: [
    'dist/main/**/*',
    'dist/preload/**/*',
    'dist/render/**/*',
  ],
  mac: {
    artifactName: '${productName}_${buildVersion}.${ext}',
    category: 'public.app-category.utilities',
    target: [{
      target: 'dmg',
      arch: ['arm64']
    }]
  },
  win: {
    artifactName: '${productName}_${buildVersion}.${ext}',
    target: [{
      target: 'nsis',
      arch: ['x64']
    },
    {
      target: 'zip',
      arch: ['x64']
    }, {
      target: 'portable',
      arch: ['x64']
    }],
  },
  nsis: {
    oneClick: false,
    perMachine: true,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: true
  }
}
