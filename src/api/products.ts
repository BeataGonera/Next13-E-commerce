import { notFound } from "next/navigation";
import {
	ProductsGetByCategorySlugDocument,
	ProductGetByIdDocument,
	type ProductListItemFragmentFragment,
	ProductsGetListDocument,
	type TypedDocumentString,
	ProductsGetByCollectionSlugDocument,
	ProductsGetSuggestedDocument,
	CategoriesGetListDocument,
	VariantsGetByProductIdDocument,
	ProductsGetListPaginateDocument,
	ProductsGetByNameDocument,
} from "@/gql/graphql";

type ProductsResponseItem = {
	id: string;
	name: string;
	price: number;
	description: string;
	categories: string[];
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};

type GraphQLResponse<T> =
	| {
			data?: undefined;
			errors: { message: string }[];
	  }
	| {
			data: T;
			errors?: undefined;
	  };

export const executeGraphQL = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
): Promise<TResult> => {
	const res = await fetch(
		"https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cln6hc4h3bho701uq8xxl5fnt/master",
		{
			method: "POST",
			body: JSON.stringify({
				query,
				variables,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const graphqlResponse =
		(await res.json()) as GraphQLResponse<TResult>;
	if (graphqlResponse.errors) {
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}
	return graphqlResponse.data;
};

export const getProductsList = async () => {
	const graphqlResponse = await executeGraphQL(
		ProductsGetListDocument,
		{},
	);
	return graphqlResponse.products;
};

export const getProductsListPaginate = async (
	first: number,
	skip: number,
) => {
	const graphqlResponse = await executeGraphQL(
		ProductsGetListPaginateDocument,
		{ first: first, skip: skip },
	);
	return graphqlResponse.products;
};

export const getCategoriesList = async () => {
	const graphqlResponse = await executeGraphQL(
		CategoriesGetListDocument,
		{},
	);
	return graphqlResponse.categories;
};

export const getVariantsByProductId = async (
	id: string,
): Promise<ProductListItemFragmentFragment[]> => {
	const graphqlResponse = await executeGraphQL(
		VariantsGetByProductIdDocument,
		{ id: id },
	);
	const variants = graphqlResponse.products[0].variants;
	return variants;
};

export const getProductsByCategorySlug = async (
	categorySlug: string,
): Promise<ProductListItemFragmentFragment[]> => {
	const graphqlResponse = await executeGraphQL(
		ProductsGetByCategorySlugDocument,
		{ slug: categorySlug },
	);
	const products = graphqlResponse.categories[0].products;
	return products;
};

export const getProductsByCollectionSlug = async (
	collectionSlug: string,
): Promise<ProductListItemFragmentFragment[]> => {
	const graphqlResponse = await executeGraphQL(
		ProductsGetByCollectionSlugDocument,
		{ slug: collectionSlug },
	);
	const products = graphqlResponse.collections[0].products;
	return products;
};

export const getSuggestedProducts = async (
	categorySlug: string,
): Promise<ProductListItemFragmentFragment[]> => {
	const graphqlResponse = await executeGraphQL(
		ProductsGetSuggestedDocument,
		{ slug: categorySlug },
	);
	const products = graphqlResponse.categories[0].products;
	return products;
};

export const getProductById = async (
	id: string,
): Promise<ProductListItemFragmentFragment> => {
	const graphqlResponse = await executeGraphQL(
		ProductGetByIdDocument,
		{ id: id },
	);
	const product = graphqlResponse.product;
	if (!product) {
		throw notFound();
	}
	return product;
};

export const getProductsByName = async (
	name: string,
): Promise<ProductListItemFragmentFragment> => {
	const graphqlResponse = await executeGraphQL(
		ProductsGetByNameDocument,
		{ name: name },
	);
	const products = graphqlResponse.products;
	if (!products) {
		throw notFound();
	}
	return products;
};

export const getProductsWithOffset = async (
	productsPerPage: number,
	activePage: number,
) => {
	const offset = productsPerPage * activePage;
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${productsPerPage}&offset=${offset}`,
	);
	const productsResponse =
		(await res.json()) as ProductsResponseItem[];

	const products = productsResponse.map(
		productsResponseItemToProductResponseType, // point-free
	);

	return products;
};

const productsResponseItemToProductResponseType = (
	productResponse: ProductsResponseItem,
) => {
	return {
		id: productResponse.id,
		name: productResponse.name,
		price: productResponse.price,
		description: productResponse.description,
		categories: productResponse.categories[0],
		image: {
			src: productResponse.image,
			alt: productResponse.name,
			width: 100,
			height: 100,
		},
		longDescription: productResponse.longDescription,
	};
};
