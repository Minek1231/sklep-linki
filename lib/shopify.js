export async function shopifyFetch(query, variables = {}) {
  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  const json = await response.json();
  return json.data;
}