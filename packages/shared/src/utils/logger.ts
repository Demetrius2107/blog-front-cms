/**
 * 调试日志工具
 *
 * 使用方式：
 *   import logger from '@vellastra/shared/utils/logger'
 *   logger.info('模块名', '操作描述', { 关键数据 })
 *
 * 控制开关：
 *   localStorage.setItem('vellastra-debug', 'true')   // 开启
 *   localStorage.setItem('vellastra-debug', 'false')  // 关闭
 *
 * 生产环境默认关闭。
 */

const DEBUG_KEY = 'vellastra-debug'

function isEnabled(): boolean {
  try {
    return localStorage.getItem(DEBUG_KEY) === 'true'
  } catch {
    return false
  }
}

function prefix(tag: string): string {
  return `[Vellastra ${tag}]`
}

const logger = {
  info(tag: string, msg: string, data?: any) {
    if (!isEnabled()) return
    console.log(`%c${prefix(tag)} ${msg}`, 'color:#409eff;font-weight:bold', data ?? '')
  },

  success(tag: string, msg: string, data?: any) {
    if (!isEnabled()) return
    console.log(`%c${prefix(tag)} ✅ ${msg}`, 'color:#67c23a;font-weight:bold', data ?? '')
  },

  warn(tag: string, msg: string, data?: any) {
    if (!isEnabled()) return
    console.warn(`${prefix(tag)} ⚠️ ${msg}`, data ?? '')
  },

  error(tag: string, msg: string, data?: any) {
    if (!isEnabled()) return
    console.error(`${prefix(tag)} ❌ ${msg}`, data ?? '')
  },

  /** 请求追踪 */
  request(method: string, url: string, data?: any) {
    if (!isEnabled()) return
    console.log(
      `%c${prefix('HTTP')} ➡️ ${method} ${url}`,
      'color:#e6a23c;font-weight:bold',
      data ?? ''
    )
  },

  /** 响应追踪 */
  response(method: string, url: string, data: any) {
    if (!isEnabled()) return
    console.log(
      `%c${prefix('HTTP')} ⬅️ ${method} ${url}`,
      'color:#67c23a;font-weight:bold',
      data
    )
  },

  /** 路由追踪 */
  route(from: string, to: string, meta?: any) {
    if (!isEnabled()) return
    console.log(
      `%c${prefix('ROUTE')} 🧭 ${from} → ${to}`,
      'color:#909399;font-weight:bold',
      meta ?? ''
    )
  },

  /** 状态追踪 */
  store(module: string, action: string, payload?: any) {
    if (!isEnabled()) return
    console.log(
      `%c${prefix('STORE')} 📦 ${module}.${action}`,
      'color:#409eff;font-weight:bold',
      payload ?? ''
    )
  }
}

export default logger