import { notFound } from "next/navigation";
import { executeGraphQL } from "./lib";

import {
	ProductsGetByCategorySlugDocument,
	ProductGetByIdDocument,
	ProductsGetListDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetSuggestedDocument,
	CategoriesGetListDocument,
	VariantsGetByProductIdDocument,
	ProductsGetListPaginateDocument,
	ProductsGetByNameDocument,
} from "@/gql/graphql";

export const getProductsList = async () => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetListDocument,
		variables: {},
	});
	return graphqlResponse.products;
};

export const getProductsListPaginate = async (
	first: number,
	skip: number,
) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetListPaginateDocument,
		variables: { first: first, skip: skip },
	});
	return graphqlResponse.products;
};

export const getCategoriesList = async () => {
	const graphqlResponse = await executeGraphQL({
		query: CategoriesGetListDocument,
		variables: {},
	});
	return graphqlResponse.categories;
};

export const getVariantsByProductId = async (id: string) => {
	const graphqlResponse = await executeGraphQL({
		query: VariantsGetByProductIdDocument,
		variables: { id: id },
	});
	const variants = graphqlResponse.products[0].variants;
	return variants;
};

export const getProductsByCategorySlug = async (
	categorySlug: string,
) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetByCategorySlugDocument,
		variables: { slug: categorySlug },
	});
	const products = graphqlResponse.categories[0].products;
	return products;
};

export const getProductsByCollectionSlug = async (
	collectionSlug: string,
) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetByCollectionSlugDocument,
		variables: { slug: collectionSlug },
	});
	const products = graphqlResponse.collections[0].products;
	return products;
};

export const getSuggestedProducts = async (categorySlug: string) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetSuggestedDocument,
		variables: { slug: categorySlug },
	});
	const products = graphqlResponse.categories[0].products;
	return products;
};

export const getProductById = async (id: string) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductGetByIdDocument,
		variables: { id: id },
	});
	const product = graphqlResponse.product;
	if (!product) {
		throw notFound();
	}
	return product;
};

export const getProductsByName = async (name: string) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetByNameDocument,
		variables: { name: name },
	});
	const products = graphqlResponse.products;
	if (!products) {
		throw notFound();
	}
	return products;
};
