import { PDFPage } from "pdf-lib";

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
  },
});

export { getHeightObject };
