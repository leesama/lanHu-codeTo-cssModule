import { isCSS, isHTML } from "../src/utils";

describe("isCSS", () => {
  it("should return true for valid CSS", () => {
    const css = `
      .my-class {
        color: red;
      }
    `;
    expect(isCSS(css)).toBe(true);
  });

  it("should return false for invalid CSS", () => {
    const css = `
      .my-class {
        color: red;
    `;
    expect(isCSS(css)).toBe(false);
  });
});

describe("isHTML", () => {
  it("should return true for valid HTML", () => {
    const html = `
      <div class="my-class">
        Hello World
      </div>
    `;
    expect(isHTML(html)).toBe(true);
  });

  it("should return false for invalid HTML", () => {
    const html = `
      <div class="my-class">
        Hello World
    `;
    expect(isHTML(html)).toBe(false);
  });
});
