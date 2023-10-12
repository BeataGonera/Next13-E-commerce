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
	type ProductListItemFragmentFragment,
} from "@/gql/graphql";

export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	categories: Array<{ name: string; slug: string }>;
	collections: Array<{ name: string; slug: string }>;
	images: Array<{ url: string }>;
	reviews: Array<{ rating: number }>;
	averageRating: number;
};

const countAverageRating = (total: number, num: number) => {
	return total + num;
};
const countRating = (reviews: Array<{ rating: number }>) => {
	if (!reviews.length) return;
	const sumWithInitial = reviews
		.map((review) => review.rating)
		.reduce(countAverageRating, 0);
	const averageRating = (sumWithInitial / reviews.length).toFixed(1);
	return averageRating;
};

const productFromQueryToProductWithAverageRating = (
	productsFromQuery: ProductListItemFragmentFragment[],
) => {
	const productsWithAverageRating: Product[] = productsFromQuery.map(
		(product) => {
			const result = countRating(product.reviews);
			let averageRating;
			if (result) {
				averageRating = result;
			} else {
				averageRating = 0;
			}
			return {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				categories: product.categories,
				collections: product.collections,
				images: product.images,
				reviews: product.reviews,
				averageRating: Number(averageRating),
			};
		},
	);
	return productsWithAverageRating;
};

export const getProductsList = async () => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetListDocument,
		variables: {},
	});
	const productsWithRating =
		productFromQueryToProductWithAverageRating(
			graphqlResponse.products,
		);
	return {
		products: productsWithRating,
		aggregate: graphqlResponse.productsConnection.aggregate.count,
	};
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
	const productsWithAverageRating =
		productFromQueryToProductWithAverageRating(
			graphqlResponse.products,
		);

	return {
		products: productsWithAverageRating,
		aggregate: graphqlResponse.productsConnection.aggregate.count,
	};
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
	first: number,
	skip: number,
	categorySlug: string,
) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetByCategorySlugDocument,
		variables: { first: first, skip: skip, slug: categorySlug },
	});
	const products = graphqlResponse.products;
	const category = graphqlResponse.products[0].categories[0];
	return {
		categoryFromQuery: category,
		products: productFromQueryToProductWithAverageRating(products),
		aggregate: graphqlResponse.productsConnection.aggregate.count,
	};
};

export const getProductsByCollectionSlug = async (
	collectionSlug: string,
	first: number,
	skip: number,
) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetByCollectionSlugDocument,
		variables: { slug: collectionSlug, first: first, skip: skip },
	});
	const products = graphqlResponse.products;
	const collectionName =
		graphqlResponse.products[0].collections[0].name;
	return {
		collectionName: collectionName,
		products: productFromQueryToProductWithAverageRating(products),
		aggregate: graphqlResponse.productsConnection.aggregate.count,
	};
};

export const getSuggestedProducts = async (categorySlug: string) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetSuggestedDocument,
		variables: { slug: categorySlug },
	});
	const products = productFromQueryToProductWithAverageRating(
		graphqlResponse.categories[0].products,
	);
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
	return productFromQueryToProductWithAverageRating(products);
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

export const getProductsOrderedByPrice = async (
	first: number,
	skip: number,
) => {
	const graphqlResponse = await executeGraphQL({
		query: ProductsGetListOrderedByPriceDocument,
		variables: {
			first: first,
			skip: skip,
		},
	});
	const orderedProducts = graphqlResponse.products;
	if (!orderedProducts) {
		throw notFound();
	}
	return {
		products:
			productFromQueryToProductWithAverageRating(orderedProducts),
		aggregate: graphqlResponse.productsConnection.aggregate.count,
	};
};

export const getProductsOrderedByRating = async () => {
	const { products } = await getProductsList();
	const productsOrderedByRating = products.sort(
		(a, b) => b.averageRating - a.averageRating,
	);
	return productsOrderedByRating.slice(0, 5);
};
