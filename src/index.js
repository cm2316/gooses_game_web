import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from 'react-query'
import store from './store'
import './sass/index.scss'
import App from './App'
import LocaleProvider from './components/LocaleProvider'
import defaultHostConfig from '@/tool/defaultHostConfig'
import 'swiper/css/bundle'
import keyboardSetup from '@/tool/keyboard-behavior'
import '@/assets/fontsjs'
// import '@khanacademy/tota11y'
const root = document.getElementById('root')
// oem:nxt/msi5/nxt_mac
// Merge client system config to window.__CLIENT_CONFIG__
function setupKeyboard() {
  keyboardSetup(true)
}
// Merge host config to window.__HOST_CONFIG__
function setHostConfig(clientHostConfig = {}) {
  const config = {}
  Object.keys(clientHostConfig).forEach((key) => {
    if (clientHostConfig[key]) {
      config[key] = clientHostConfig[key]
    }
  })
  Object.defineProperty(window, '__HOST_CONFIG__', {
    writable: false,
    enumerable: false,
    value: Object.freeze({ ...defaultHostConfig, ...config }),
  })
}
// Instantiate Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
      staleTime: 0,
      cacheTime: 0,
    },
  },
})

// setupKeyboard()
setHostConfig()

render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </QueryClientProvider>
  </Provider>,
  root
)
