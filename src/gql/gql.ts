/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartAddProduct($orderId: ID!, $total: Int!, $productId: ID!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}\n  ) {\n    id\n  }\n}": types.CartAddProductDocument,
    "mutation CartCreate($total: Int!) {\n  createOrder(data: {total: $total}) {\n    id\n  }\n}": types.CartCreateDocument,
    "fragment CartFragment on Order {\n  id\n  orderItems {\n    ...OrderItemFragment\n  }\n}": types.CartFragmentFragmentDoc,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...CartFragment\n  }\n}": types.CartGetByIdDocument,
    "mutation cartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveProductDocument,
    "mutation cartSetProductQuantity($id: ID!, $quantity: Int!, $total: Int!) {\n  updateOrderItem(where: {id: $id}, data: {quantity: $quantity, total: $total}) {\n    id\n    total\n  }\n}": types.CartSetProductQuantityDocument,
    "query CategoriesGetList {\n  categories {\n    name\n    slug\n  }\n}": types.CategoriesGetListDocument,
    "query CollectionsGetList {\n  collections {\n    name\n    slug\n    image {\n      url\n    }\n    description\n  }\n}": types.CollectionsGetListDocument,
    "fragment OrderItemFragment on OrderItem {\n  id\n  quantity\n  total\n  product {\n    ...ProductListItemFragment\n  }\n}": types.OrderItemFragmentFragmentDoc,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItemFragment\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListItemFragment on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n    slug\n  }\n  collections(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  reviews {\n    rating\n  }\n}": types.ProductListItemFragmentFragmentDoc,
    "query ProductsGetByCategorySlug($first: Int!, $skip: Int!, $slug: String!) {\n  products(first: $first, skip: $skip, where: {categories_some: {slug: $slug}}) {\n    ...ProductListItemFragment\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($first: Int!, $skip: Int!, $slug: String!) {\n  products(first: $first, skip: $skip, where: {collections_some: {slug: $slug}}) {\n    ...ProductListItemFragment\n  }\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetByName($name: String) {\n  products(where: {name_contains: $name}) {\n    ...ProductListItemFragment\n  }\n}": types.ProductsGetByNameDocument,
    "query ProductsGetList {\n  products {\n    ...ProductListItemFragment\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "query productsGetListOrderedByPrice($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip, orderBy: price_ASC) {\n    ...ProductListItemFragment\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListOrderedByPriceDocument,
    "query ProductsGetListPaginate($first: Int, $skip: Int) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItemFragment\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListPaginateDocument,
    "query ProductsGetSuggested($slug: String!) {\n  categories(where: {slug: $slug}) {\n    name\n    products(first: 4) {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductsGetSuggestedDocument,
    "mutation ReviewCreate($productId: ID!, $headline: String!, $name: String!, $email: String!, $content: String!, $rating: Int!) {\n  createReview(\n    data: {headline: $headline, name: $name, email: $email, content: $content, rating: $rating, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}": types.ReviewCreateDocument,
    "query VariantsGetByProductId($id: ID!) {\n  products(where: {id: $id}) {\n    variants {\n      ... on ProductSizeColorVariant {\n        name\n        color\n        size\n      }\n    }\n  }\n}": types.VariantsGetByProductIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($orderId: ID!, $total: Int!, $productId: ID!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate($total: Int!) {\n  createOrder(data: {total: $total}) {\n    id\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CartFragment on Order {\n  id\n  orderItems {\n    ...OrderItemFragment\n  }\n}"): typeof import('./graphql').CartFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...CartFragment\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation cartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation cartSetProductQuantity($id: ID!, $quantity: Int!, $total: Int!) {\n  updateOrderItem(where: {id: $id}, data: {quantity: $quantity, total: $total}) {\n    id\n    total\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories {\n    name\n    slug\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    name\n    slug\n    image {\n      url\n    }\n    description\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment OrderItemFragment on OrderItem {\n  id\n  quantity\n  total\n  product {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').OrderItemFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItemFragment on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n    slug\n  }\n  collections(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  reviews {\n    rating\n  }\n}"): typeof import('./graphql').ProductListItemFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($first: Int!, $skip: Int!, $slug: String!) {\n  products(first: $first, skip: $skip, where: {categories_some: {slug: $slug}}) {\n    ...ProductListItemFragment\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($first: Int!, $skip: Int!, $slug: String!) {\n  products(first: $first, skip: $skip, where: {collections_some: {slug: $slug}}) {\n    ...ProductListItemFragment\n  }\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByName($name: String) {\n  products(where: {name_contains: $name}) {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').ProductsGetByNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products {\n    ...ProductListItemFragment\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query productsGetListOrderedByPrice($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip, orderBy: price_ASC) {\n    ...ProductListItemFragment\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListOrderedByPriceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListPaginate($first: Int, $skip: Int) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItemFragment\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListPaginateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetSuggested($slug: String!) {\n  categories(where: {slug: $slug}) {\n    name\n    products(first: 4) {\n      ...ProductListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetSuggestedDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewCreate($productId: ID!, $headline: String!, $name: String!, $email: String!, $content: String!, $rating: Int!) {\n  createReview(\n    data: {headline: $headline, name: $name, email: $email, content: $content, rating: $rating, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').ReviewCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query VariantsGetByProductId($id: ID!) {\n  products(where: {id: $id}) {\n    variants {\n      ... on ProductSizeColorVariant {\n        name\n        color\n        size\n      }\n    }\n  }\n}"): typeof import('./graphql').VariantsGetByProductIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
