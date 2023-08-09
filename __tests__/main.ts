import { isCSS, isHTML } from "../src/utils";
import { expect, test } from "vitest";

test("isCSS should return true for valid CSS", () => {
  const css = `
    .my-class {
      color: red;
    }
  `;
  expect(isCSS(css)).toBe(true);
});

test("isCSS should return false for invalid CSS", () => {
  const css = `
    .my-class {
      color: red;
  `;
  expect(isCSS(css)).toBe(false);
});

test("isHTML should return true for valid HTML", () => {
  const html = `
    <div class="my-class">
      Hello World
    </div>
  `;
  expect(isHTML(html)).toBe(true);
});

test("isHTML should return false for invalid HTML", () => {
  const html = `
    <div class="my-class">
      Hello World
  `;
  expect(isHTML(html)).toBe(false);
});
