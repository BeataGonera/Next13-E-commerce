import { executeGraphQL } from "./lib";
import { CollectionsGetListDocument } from "@/gql/graphql";

export const getCollectionsList = async () => {
	const graphqlResponse = await executeGraphQL({
		query: CollectionsGetListDocument,
		variables: {},
	});
	return graphqlResponse.collections;
};
