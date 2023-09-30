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
    "query ProductGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    name\n    products(first: 10) {\n      ... on Product {\n        ...ProductListItemFragment\n      }\n    }\n  }\n}": types.ProductGetByCategorySlugDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItemFragment\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListItemFragment on Product {\n  id\n  name\n  categories(first: 1) {\n    name\n  }\n  price\n  image\n  description\n  longDescription\n}": types.ProductListItemFragmentFragmentDoc,
    "query ProductsGetList {\n  products {\n    ...ProductListItemFragment\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    name\n    products(first: 10) {\n      ... on Product {\n        ...ProductListItemFragment\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItemFragment on Product {\n  id\n  name\n  categories(first: 1) {\n    name\n  }\n  price\n  image\n  description\n  longDescription\n}"): typeof import('./graphql').ProductListItemFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
