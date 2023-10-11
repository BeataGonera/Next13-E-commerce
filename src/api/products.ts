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
	ReviewCreateDocument,
	ProductsGetListOrderedByPriceDocument,
	ProductsGetListOrderedByRatingDocument,
	ProductListItemFragmentFragment,
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
		next: {
			revalidate: 15,
		},
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
	const categoryName = graphqlResponse.categories[0].name;
	return {
		categoryName: categoryName,
		products: products,
	};
};

export const getProductsByCollectionSlug = async (
	collectionSlug: string,
) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetByCollectionSlugDocument,
		variables: { slug: collectionSlug },
	});
	const products = graphqlResponse.collections[0].products;
	const collectionName = graphqlResponse.collections[0].name;
	return {
		collectionName: collectionName,
		products: products,
	};
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

export const createReview = async (
	productId: string,
	headline: string,
	name: string,
	email: string,
	content: string,
	rating: number,
) => {
	await executeGraphQL({
		query: ReviewCreateDocument,
		variables: {
			productId: productId,
			headline: headline,
			name: name,
			email: email,
			content: content,
			rating: rating,
		},
	});
};

export const getProductsOrderedByPrice = async () => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetListOrderedByPriceDocument,
		variables: {},
	});
	const orderedProducts = graphqlResponse.products;
	if (!orderedProducts) {
		throw notFound();
	}
	return orderedProducts;
};
