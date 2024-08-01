import {
  parse,
  Slide,
  Element,
  Shape,
  Text,
  Table,
  Chart,
  Diagram,
} from "pptxtojson";
import pptxgen from "pptxgenjs";
import { extractContentFromRichHtmlText as t } from "./tool";

export type PPTJson = Awaited<ReturnType<typeof parse>>;

export function zipPPTJson(pptJson: PPTJson) {
  return {
    slides: pptJson.slides.map(zipSlide),
  };
}

function zipSlide(slide: Slide) {
  return {
    type: "slide",
    elements: slide.elements.map(zipElement).filter((el) => !!el),
  };
}

function zipShape(shape: Shape) {
  const pureContent = t(shape.content);
  if (!pureContent) return;
  return {
    type: "shape",
    content: pureContent,
  };
}

function zipText(text: Text) {
  const pureContent = t(text.content);
  if (!pureContent) return;
  return {
    type: "text",
    content: pureContent,
  };
}

function zipTable(table: Table) {
  return {
    type: "table",
    content: table.data.map((row) =>
      row.map((grid) => ({
        ...grid,
        text: t(grid.text),
      }))
    ),
  };
}

function zipChart(chart: Chart) {
  return {
    type: "chart",
    chartType: chart.chartType,
    data: chart.data,
  };
}

function zipDiagram(diagram: Diagram) {
  return {
    type: "diagram",
    elements: diagram.elements.map(zipElement).filter((el) => !!el),
  };
}

function zipElement(element: Element): Record<string, any> | undefined {
  switch (element.type) {
    case "shape":
      return zipShape(element);
    case "text":
      return zipText(element);
    case "table":
      return zipTable(element);
    case "chart":
      return zipChart(element);
    case "diagram":
      return zipDiagram(element);
    case "group":
      return {
        type: "group",
        elements: element.elements.map(zipElement).filter((el) => !!el),
      };
  }
}

interface TableCell {
  text?: string;
}

type TableRow = TableCell[];

type TableElement = {
  type: "table";
  content: TableRow[];
};

type ShapeElement = {
  type: "shape";
  content: string;
};

type TextElement = {
  type: "text";
  content: string;
};

type SildeElement = TableElement | ShapeElement | TextElement;

type PPTSlide = {
  elements: SildeElement[];
};

type PPTSource = {
  slides: PPTSlide[];
};

export async function genPPT(source: PPTSource) {
  const pres = new pptxgen();
  source.slides.forEach((slideSource) => {
    genSlide(pres, slideSource);
  });
  return pres.write() as Promise<Blob>;
}

function genSlide(pres: pptxgen, slideSource: PPTSlide) {
  const slide = pres.addSlide();
  slideSource.elements.forEach((element) => {
    genElement(slide, element);
  });
}

function genElement(slide: pptxgen.Slide, element: SildeElement) {
  switch (element.type) {
    case "shape":
      return slide.addText(element.content, { shape: "rect" });
    case "text":
      return slide.addText(element.content);
    case "table":
      return slide.addTable(element.content);
  }
}
