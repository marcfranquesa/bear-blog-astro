import { getCollection } from "astro:content";

export async function getStaticPaths() {
    const papers = await getCollection("papers", (paper) => Boolean(paper.body?.trim()));
    return papers.map((paper) => ({
        params: { slug: paper.id },
        props: { bibtex: paper.body },
    }));
}

export const GET = ({ props }: { props: { bibtex: string } }) => {
  const { bibtex } = props;
  return new Response(bibtex, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
