// @ts-ignore
import mdtoast from "@dmuy/toast";
import { getClassNameContentIfOtherCode, getClassNameContentIfReactCode, isCSS, isHTML, isReactCode } from "./utils";
import commonCSSObj, { commonCssProperty } from "./commonCss";
import taroTagMap from "./tagMap/taro";
import "@dmuy/toast/dist/mdtoast.css";

let classNamesObj: Record<string, string[]> | null;

// 处理 HTML 内容的函数
const handleHtmlContent = (html: string, isReact: boolean) => {
  const getClassNameContent = isReact ? getClassNameContentIfReactCode : getClassNameContentIfOtherCode;
  const regex = isReact ? /className\s*=\s*"([^"]+)"/g : /class\s*=\s*"([^"]+)"/g;

  let processedHtml = html;
  processedHtml = replaceTags(processedHtml);
  processedHtml = replaceClassNamesAndCollect(processedHtml, regex, getClassNameContent);

  return processedHtml;
};

// 替换 HTML 标签
const replaceTags = (html: string) => {
  const isTaroMode = localStorage.getItem("isTaroMode") === "true";
  if (!isTaroMode) return html;
  return html.replace(/<\/*([a-zA-Z0-9]+)(\s|>)/g, (match, tag, followingChar) => {
    const taroTag = taroTagMap[tag];
    return taroTag ? `<${match.startsWith('</') ? '/' : ''}${taroTag}${followingChar}` : match;
  });
};

// 替换类名并收集类名信息
const replaceClassNamesAndCollect = (html: string, regex: RegExp, getClassNameContent: Function) => {
  return html.replace(regex, (match, classNamesString) => {
    const classNames = classNamesString.split(" ");
    if (classNames.length > 0) {
      classNamesObj![classNames[0]] = classNames.slice(1);
      return getClassNameContent(classNames[0]);
    }
    return match;
  });
};

// 处理 CSS 内容的函数
const handleCssContent = (css: string) => {
  if (!classNamesObj) {
    mdtoast("请先复制节点代码！", { duration: 500, position: "top right" });
    return css; // 如果没有classNamesObj，则返回原始CSS
  }

  const regex = /\.([a-zA-Z0-9_-]+)\s*\{([\s\S]*?)\}/g;
  return css.replace(regex, (_, className, cssContent) => {
    const additionalCssArray = classNamesObj![className]?.map(cn => commonCSSObj[cn]) || [];
    const additionalCss = additionalCssArray.join(' ');
    return `.${className} { ${cssContent} ${additionalCss} ${commonCssProperty} }\n`;
  });
};

// 复制事件处理器
const handleCopy = (e: ClipboardEvent) => {
  e.preventDefault();
  const copyText = window.getSelection()!.toString();

  if (isHTML(copyText)) {
    classNamesObj = {};
    const isReact = isReactCode(copyText);
    const newHtml = handleHtmlContent(copyText, isReact);
    e.clipboardData!.setData("text/plain", newHtml);
  } else if (isCSS(copyText)) {
    const newCss = handleCssContent(copyText);
    e.clipboardData!.setData("text/plain", newCss);
  }
};

document.addEventListener("copy", handleCopy);




