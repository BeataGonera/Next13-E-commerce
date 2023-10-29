import type { TypedDocumentString } from "@/gql/graphql";

type GraphQLResponse<T> =
	| {
			data?: undefined;
			errors: { message: string }[];
	  }
	| {
			data: T;
			errors?: undefined;
	  };

export const executeGraphQL = async <TResult, TVariables>({
	query,
	variables,
	next,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	variables: TVariables;
	next?: NextFetchRequestConfig;
	cache?: RequestCache;
}): Promise<TResult> => {
	const res = await fetch(
		"https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/cln6hc4h3bho701uq8xxl5fnt/master",
		{
			method: "POST",
			body: JSON.stringify({
				query,
				variables,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			next,
			cache: "no-cache",
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
