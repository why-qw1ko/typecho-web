import type { I18nOptions } from 'vue-i18n'

export default <I18nOptions>{
  legacy: false,
  locale: 'zh-CN',
  defaultLocale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': {
      welcome: '欢迎',
      login: '登录',
      logout: '退出登录',
      username: '用户名',
      password: '密码',
      rememberMe: '记住我',
      loginButton: '登录',
      loggingIn: '登录中...',
      loginFailed: '登录失败',
      noAccount: '还没有账号？',
      register: '注册',
    },
    'en-US': {
      welcome: 'Welcome',
      login: 'Login',
      logout: 'Logout',
      username: 'Username',
      password: 'Password',
      rememberMe: 'Remember me',
      loginButton: 'Login',
      loggingIn: 'Logging in...',
      loginFailed: 'Login failed',
      noAccount: "Don't have an account?",
      register: 'Register',
    },
  },
}
