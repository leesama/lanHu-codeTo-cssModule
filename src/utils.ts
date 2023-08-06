// 判断字符串是不是html
export function isHTML(str: string) {
  return /<[a-z][\s\S]*>/i.test(str);
}
// 判断字符串是css
export function isCSS(str: string) {
  return /{[\s\S]*}/.test(str);
}
