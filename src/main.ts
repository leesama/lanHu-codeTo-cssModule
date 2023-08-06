import { throttle } from "lodash";
import { isCSS, isHTML } from "./utils";
import commonCSS from "./commonCss";
// 定义一个空数组来存储类名对象
const classNamesArray: Record<string, string[]>[] = [];
// 使用正则表达式检查复制的内容是否是 HTML 字符串

const handleCopy = throttle(
  (e: ClipboardEvent) => {
    // 阻止默认的复制行为
    e.preventDefault();
    const copyText = window.getSelection()!.toString();
    if (isHTML(copyText)) {
      const regex = /className\s*=\s*"([^"]+)"/g;
      let newHtml = copyText.replace(regex, (match, classNamesString) => {
        const classNames = classNamesString.split(" ");
        if (classNames.length > 0) {
          return `className={styles.${classNames[0]}}`;
        }
        return match;
      });

      let match;
      while ((match = regex.exec(copyText))) {
        const classNamesString = match[1];
        const classNames = classNamesString.split(" ");
        if (classNames.length > 1) {
          const classNameObj = {
            [classNames[0]]: classNames.slice(1),
          };
          classNamesArray.push(classNameObj);
        }
      }
      console.log("newHtml", newHtml, classNamesArray);
    } else if (isCSS(copyText)) {
      // 复制的内容是 CSS 文件
      // 根据 classNamesArray 合并 CSS 属性
      let mergedCSS = copyText;
      classNamesArray.forEach((classObj) => {
        for (const className in classObj) {
          const classStyles = classObj[className].join(" ");
          const regex = new RegExp(`\\.${className}\\s*{`);
          mergedCSS = mergedCSS.replace(regex, (match) => {
            return `${match} ${classStyles}`;
          });
        }
      });

      // 合并公共样式到 CSS 文件中
      mergedCSS = commonCSS + mergedCSS;
    }

    // // 获取用户选中的文本
    // const selectedText = window.getSelection()!.toString();

    // // 在控制台输出用户选中的文本
    // console.log("用户选中的文本：", selectedText);

    // 在这里你可以对选中的文本进行处理或修改
    // 修改后的内容
    // const modifiedText = "修改后的内容";

    // // 使用 Clipboard API 写入修改后的内容到剪贴板
    // if (event.clipboardData) {
    //   event.clipboardData.setData("text/plain", modifiedText);
    //   alert("复制成功：" + modifiedText);
    // } else {
    //   // 如果浏览器不支持 Clipboard API，可以考虑使用其他方式处理
    //   alert("浏览器不支持 Clipboard API，复制失败！");
    // }
  },
  2000,
  { trailing: false }
);

document.addEventListener("copy", handleCopy);
