// 解码 HTML 实体
export const decodeHtml = (html: string): string => {
  if (!html) return ''
  if (typeof window === 'undefined') return html
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}
