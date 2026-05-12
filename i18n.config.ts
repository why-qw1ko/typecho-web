import type { I18nOptions } from 'vue-i18n'

export default <I18nOptions>{
  legacy: false,
  locale: 'zh-CN',
  defaultLocale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': {
      welcome: '欢迎',
    },
    'en-US': {
      welcome: 'Welcome',
    },
  },
}
