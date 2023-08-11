// 判断字符串是不是html
export function isHTML(str: string) {
  return /<[a-z][\s\S]*>/i.test(str);
}
// 判断字符串是css
export function isCSS(str: string) {
  return /{[\s\S]*}/.test(str);
}

export function isReactCode(copyText: string) {
  return copyText.includes("className");
}

export function getClassNameContentIfReactCode(className: string) {
  return `className={styles["${className}"]}`;
}
export function getClassNameContentIfOtherCode(className: string) {
  return `class="${className}"`;
}
