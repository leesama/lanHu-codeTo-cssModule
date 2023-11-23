import { awaitElement } from "./utils";

// 设置Taro模式开启时的按钮样式
function setTaroModeOnStyle(button: HTMLButtonElement) {
  button.innerText = "关闭Taro模式";
  button.style.cssText = `
    box-sizing: border-box;
    border: 2px solid #63C3DE;
    border-radius: 49px;
    background-color:#63C3DE;
    border-radius: 38px;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding:10px 20px;
  `;
}

// 设置Taro模式关闭时的按钮样式
function setTaroModeOffStyle(button: HTMLButtonElement) {
  button.innerText = "开启Taro模式";
  button.style.cssText = `
    box-sizing: border-box;
    border: 2px solid #63C3DE;
    border-radius: 49px;
    background-color: #fff;
    border-radius: 38px;
    color: #63C3DE;
    display: flex;
    flex-direction: column;
   padding:10px 20px;
  `;
}

function createButton() {
  const button = document.createElement("button");
  const isTaroMode = localStorage.getItem("isTaroMode") === "true";

  // 根据当前Taro模式设置初始样式
  if (isTaroMode) {
    setTaroModeOnStyle(button);
  } else {
    setTaroModeOffStyle(button);
  }

  button.addEventListener("click", () => {
    const isTaroMode = localStorage.getItem("isTaroMode") === "true";
    localStorage.setItem("isTaroMode", isTaroMode ? "false" : "true");

    // 根据点击后的Taro模式设置样式
    if (isTaroMode) {
      setTaroModeOffStyle(button);
    } else {
      setTaroModeOnStyle(button);
    }
  });

  return button;
}

async function addButtonToCodeTitle() {
  const codeTitle = await awaitElement(".code-title");
  const button = createButton();
  codeTitle!.insertBefore(button, codeTitle!.children[1]);
}

addButtonToCodeTitle();
