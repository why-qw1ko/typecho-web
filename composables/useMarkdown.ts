import { marked } from 'marked'

export const useMarkdown = () => {
  const render = (content: string) => {
    if (!content) return ''

    if (content.includes('<!--markdown-->')) {
      content = content.replace('<!--markdown-->', '')
    }

    return marked.parse(content, {
      async: false,
      gfm: true,
      breaks: true,
    }) as string
  }

  return { render }
}
