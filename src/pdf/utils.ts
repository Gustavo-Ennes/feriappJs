import { PDFPage, TextAlignment, layoutMultilineText } from "pdf-lib";
import { GetMultiTextWidthParam } from "./types";

const getHeightObject = (page: PDFPage) => ({
  actual: page.getHeight() - 80,
  stepHugeLine() {
    this.actual -= 28;
  },
  stepLine() {
    this.actual -= 20;
  },
  stepSmallLine() {
    this.actual -= 12;
  }
});

const getMultiTextMeasures = ({
  font,
  fontSize,
  lineHeight,
  maxWidth,
  page,
  text,
  x,
  y
}: GetMultiTextWidthParam) => {
  const multiText = layoutMultilineText(text, {
    alignment: TextAlignment.Center,
    bounds: {
      height: page.getHeight(),
      width: maxWidth ?? page.getWidth() - x * 2,
      x,
      y
    },
    font,
    fontSize
  });
  return multiText.lines.reduce(
    (measures, { text }) => {
      const paragraphWidth = font.widthOfTextAtSize(text, fontSize);
      measures.width =
        paragraphWidth > measures.width ? paragraphWidth : measures.width;
      measures.height += lineHeight;
      return measures;
    },
    { height: 0, width: 0 }
  );
};

export { getHeightObject, getMultiTextMeasures };
