import { shopifyFetch } from "../lib/shopify";

export async function getStaticProps() {
  const query = `
    {
      products(first: 6) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query);

  return {
    props: {
      products: data.products.edges,
    },
  };
}

export default function Home({ products }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Produkty</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>
        {products.map(({ node }) => (
          <div key={node.id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "10px"
          }}>
            <img src={node.images.edges[0]?.node.src} alt={node.title} width="200" />
            <h2>{node.title}</h2>
            <p>{node.priceRange.minVariantPrice.amount} PLN</p>
          </div>
        ))}
      </div>
    </div>
  );
}