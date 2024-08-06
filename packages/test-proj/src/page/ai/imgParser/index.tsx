
import MarkDown from "markdown-it";

import hljs from "highlight.js";

let markdown: MarkDown;

function createMarkdown( ) {
  if (markdown) {
    return markdown;
  }

  markdown = MarkDown({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        } catch (err) {
          console.log(err);
        }
      }
      return markdown.utils.escapeHtml(str);
    },
  });
  return markdown;
}

function ImgParserPage() {
  return (
    <div>
      <h1>ImgParser</h1>
      <div dangerouslySetInnerHTML={{ __html: createMarkdown }}></div>
    </div>
  );
}

export default ImgParserPage;
