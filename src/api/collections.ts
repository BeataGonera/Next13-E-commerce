import { CollectionsGetListDocument } from "@/gql/graphql";
import { executeGraphQL } from "./lib";

export const getCollectionsList = async () => {
	const graphqlResponse = await executeGraphQL({
		query: CollectionsGetListDocument,
		variables: {},
	});
	return graphqlResponse.collections;
};
