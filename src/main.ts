// @ts-ignore
import mdtoast from "@dmuy/toast";
import {
  getClassNameContentIfOtherCode,
  getClassNameContentIfReactCode,
  isCSS,
  isHTML,
  isReactCode,
} from "./utils";
import commonCSSObj, { commonCssProperty } from "./commonCss";
import "@dmuy/toast/dist/mdtoast.css";
let classNamesObj: Record<string, string[]> | null;

const handleCopy = (e: ClipboardEvent) => {
  // 阻止默认的复制行为
  e.preventDefault();
  const copyText = window.getSelection()!.toString();

  if (isHTML(copyText)) {
    classNamesObj = {};
    let regex: RegExp;
    let getClassNameContent: Function;
    // react代码和其他代码处理方式不一样
    if (isReactCode(copyText)) {
      getClassNameContent = getClassNameContentIfReactCode;
      regex = /className\s*=\s*"([^"]+)"/g;
    } else {
      getClassNameContent = getClassNameContentIfOtherCode;
      regex = /class\s*=\s*"([^"]+)"/g;
    }

    let newHtml = copyText.replace(regex, (match, classNamesString) => {
      const classNames = classNamesString.split(" ");
      if (classNames.length > 0) {
        return getClassNameContent(classNames[0]);
      }
      return match;
    });

    let match;
    while ((match = regex.exec(copyText))) {
      const classNamesString = match[1];
      const classNames = classNamesString.split(" ");
      if (classNames.length > 1) {
        classNamesObj[classNames[0]] = classNames.slice(1);
      }
    }
    e.clipboardData!.setData("text/plain", newHtml);
    return;
  } else if (isCSS(copyText)) {
    if (!classNamesObj) {
      mdtoast("请先复制节点代码！", {
        duration: 500,
        position: "top right",
      });
      return;
    }
    // 通过正则匹配css类名对应的内容
    const regex = /\.([a-zA-Z0-9_-]+)\s*\{([\s\S]*?)\}/g;
    let newCss = copyText.replace(regex, (_, className, css) => {
      if (classNamesObj![className]) {
        let cssStr = "";
        classNamesObj![className].forEach((className) => {
          cssStr += `${commonCSSObj[className]}`;
        });
        return `.${className} { ${css} ${commonCssProperty} ${cssStr}}\n`;
      } else {
        return `.${className} { ${css} ${commonCssProperty}}\n`;
      }
    });

    e.clipboardData!.setData("text/plain", newCss);
  }
};

document.addEventListener("copy", handleCopy);
