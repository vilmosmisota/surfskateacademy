import Head from "next/head";

export default function Seo() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <title>The SurfSkate Academy</title>
      <meta name="description" content="On land surf training in Scotland" />
      <meta
        name="keywords"
        content="surf, training, skate, improve surfing, Scotland"
      />
      <meta property="og:type" content="website" />
      <link rel="canonical" href="https://thesurfskateacademy.com/" />
      <meta property="og:type" content="website" />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-touch-icon.png"
      />
      <link
        rel="shortcut icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
  );
}
