import type { FiltersInterface, ProductInterface } from '../../interfaces';

export async function fetchProducts(
  filter: FiltersInterface
): Promise<ProductInterface[] | ProductInterface> {
  const query = new URLSearchParams();
  if (filter.category !== 'all') {
    query.append('category', filter.category);
  }
  query.append('limit', '20');
  query.append(
    'price',
    `{"$gte":${filter.priceRange[0]}, "$lte":${filter.priceRange[1]}}`
  );
  const products = await (
    await fetch(`https://restapi.fr/api/vueprojectproducts?${query}`)
  ).json();
  return products;
}
