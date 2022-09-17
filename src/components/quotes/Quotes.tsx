import ReactMarkdown from "react-markdown";

type QuotesProps = {
  quotes: {
    fields: {
      content: string;
    };
  };
};

export default function Quotes({ quotes }: QuotesProps) {
  return (
    <section className="px-8 py-5 mx-4 mb-10 lg:mx-auto rounded-lg max-w-2xl bg-beige">
      <ReactMarkdown className="markdown-text-quote mb-5">
        {quotes.fields.content}
      </ReactMarkdown>
    </section>
  );
}
