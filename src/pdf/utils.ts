import { PDFFont, PDFPage, TextAlignment, layoutMultilineText } from "pdf-lib";
import { GetMultiTextWidthParam } from "./types";

const getHeightObject = (page: PDFPage) => ({
  actual: page.getHeight() - 80,
  stepLine() {
    this.actual -= 20;
  },
  stepSmallLine() {
    this.actual -= 12;
  },
  stepHugeLine() {
    this.actual -= 28;
  }
});

const getMultiTextMeasures = ({
  text,
  font,
  fontSize,
  page,
  maxWidth,
  lineHeight,
  x,
  y,
}: GetMultiTextWidthParam) => {
  const multiText = layoutMultilineText(text, {
    alignment: TextAlignment.Center,
    font,
    fontSize,
    bounds: {
      height: page.getHeight(),
      width: maxWidth ?? page.getWidth() - x * 2,
      x,
      y
    }
  });
  return multiText.lines.reduce((measures, {text}) => {
    const paragraphWidth = font.widthOfTextAtSize(text, fontSize);
    measures.width = paragraphWidth > measures.width ? paragraphWidth : measures.width
    measures.height += lineHeight
    return measures
  }, {width: 0, height: 0});
};

export { getHeightObject, getMultiTextMeasures };
