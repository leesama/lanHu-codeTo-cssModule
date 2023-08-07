const commonCss = `.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.justify-start {
  display: flex;
  justify-content: flex-start;
}
.justify-center {
  display: flex;
  justify-content: center;
}

.justify-end {
  display: flex;
  justify-content: flex-end;
}
.justify-evenly {
  display: flex;
  justify-content: space-evenly;
}
.justify-around {
  display: flex;
  justify-content: space-around;
}
.justify-between {
  display: flex;
  justify-content: space-between;
}
.align-start {
  display: flex;
  align-items: flex-start;
}
.align-center {
  display: flex;
  align-items: center;
}
.align-end {
  display: flex;
  align-items: flex-end;
}
`;
const commonCssObj: Record<string, string> = {};
const regex = /\.([a-zA-Z0-9_-]+)\s*\{([\s\S]*?)\}/g;
let match;
while ((match = regex.exec(commonCss))) {
  const className = match[1];
  const css = match[2];
  commonCssObj[className] = css.replace(/^\s+/, " ");
}

export const commonCssProperty = `
 box-sizing: border-box;
 flex-shrink: 0;
`;
export default commonCssObj;
