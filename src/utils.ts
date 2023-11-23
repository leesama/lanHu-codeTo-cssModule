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
/**
 * Wrapped console.log function.
 *
 * @export
 * @param {*} args
 */
// 翻译
// 包装的console.log函数。
export function log(...args: any[]) {
  console.log(
      "%cUserscript (React Mode):",
      "color: purple; font-weight: bold",
      ...args
  );
}

/**
* Wrapped version of `fetch` that logs the output as it's being fetched.
* It also specifies the full path, because in Greasemonkey, the full path is needed.
*
* @param {string} arg
* @returns {Promise} - the `fetch` promise
*/
export function logFetch(arg: string) {
  const url = new URL(arg, window.location as any);
  log("fetching", "" + url);
  return fetch("" + url, { credentials: "include" });
}

/**
* Ensure `callback` is called every time window.location changes
* Code derived from https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
*
* @export
* @param {function} callback - function to be called when URL changes
* @returns {MutationObserver} - MutationObserver that watches the URL
*/
export function addLocationChangeCallback(callback: () => void) {
  // Run the callback once right at the start
  window.setTimeout(callback, 0);

  // Set up a `MutationObserver` to watch for changes in the URL
  let oldHref = window.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver((mutations) => {
      if (mutations.some(() => oldHref !== document.location.href)) {
          oldHref = document.location.href;
          callback();
      }
  });

  observer.observe(body!, { childList: true, subtree: true });
  return observer;
}


// 等待具有指定选择器的元素被找到，然后返回所选的dom节点。这用于延迟渲染小部件，直到其父节点出现。

export async function awaitElement(selector:  string   
  ): Promise<Element> {
  const MAX_TRIES = 60;
  let tries = 0;
  return new Promise((resolve, reject) => {
      function probe() {
          tries++;
          return document.querySelector(selector);
      }

      function delayedProbe() {
          if (tries >= MAX_TRIES) {
              log("Can't find element with selector", selector);
              reject();
              return;
          }
          const elm = probe();
          if (elm) {
              resolve(elm);
              return;
          }

          window.setTimeout(delayedProbe, 250);
      }

      delayedProbe();
  });
}
