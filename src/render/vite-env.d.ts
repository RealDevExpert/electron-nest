/// <reference types="vite/client" />

interface Window {
  ipcRender: import('electron').IpcRenderer;
}

declare module 'plotly.js-locales/zh-CN' {
  const plotlyLocale: any;
  export default plotlyLocale;
}
