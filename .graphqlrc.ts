import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	schema:
		"https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cln49wtmp4ugq01uo8itz6ibq/master",
	overwrite: true,
	documents: "src/graphql/*.graphql",
	ignoreNoDocuments: true,
	generates: {
		"src/gql/": {
			preset: "client",
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				useTypeImports: true,
				enumsAsTypes: true,
				defaultScalarType: "unknown",
				skipTypename: true,
				documentMode: "string",
			},
			plugins: [],
		},
	},
};

export default config;
