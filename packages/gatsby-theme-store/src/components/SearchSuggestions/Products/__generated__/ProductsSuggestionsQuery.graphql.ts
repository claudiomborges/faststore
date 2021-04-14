
/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */

// Base Types
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type Maybe<T> = T | null | undefined
type Scalars = {
  Boolean: boolean
  String: string
  Float: number
  Int: number
  ID: string
}

// Operation related types
export type ProductsSuggestionsQueryQueryVariables = Exact<{
  fullText: Scalars['String'];
  regionId: Maybe<Scalars['String']>;
  facetKey: Maybe<Scalars['String']>;
  facetValue: Maybe<Scalars['String']>;
  simulationBehavior?: Maybe<Vtex_SimulationBehavior>;
}>;


export type ProductsSuggestionsQueryQuery = { vtex: { productSuggestions: Maybe<{ count: number, products: Array<Maybe<{ productName: Maybe<string>, linkText: Maybe<string>, key: Maybe<string>, id: Maybe<string>, productClusters: Maybe<Array<Maybe<{ id: Maybe<string>, name: Maybe<string> }>>>, items: Maybe<Array<Maybe<{ itemId: Maybe<string>, images: Maybe<Array<Maybe<{ imageUrl: Maybe<string>, imageText: Maybe<string> }>>>, sellers: Maybe<Array<Maybe<{ sellerId: Maybe<string>, commercialOffer: Maybe<{ spotPrice: Maybe<number>, availableQuantity: Maybe<number>, price: Maybe<number>, listPrice: Maybe<number>, maxInstallments: Maybe<Array<Maybe<{ value: Maybe<number>, numberOfInstallments: Maybe<number> }>>>, installments: Maybe<Array<Maybe<{ value: Maybe<number>, numberOfInstallments: Maybe<number>, interestRate: Maybe<number> }>>>, teasers: Maybe<Array<{ name: Maybe<string> }>> }> }>>> }>>> }>> }> } };


// Query Related Code

export const ProductsSuggestionsQuery = {
  query: process.env.NODE_ENV === 'production' ? undefined : "query ProductsSuggestionsQuery($fullText: String!, $regionId: String, $facetKey: String, $facetValue: String, $simulationBehavior: VTEX_SimulationBehavior = default) {\n  vtex {\n    productSuggestions(\n      fullText: $fullText\n      regionId: $regionId\n      facetKey: $facetKey\n      facetValue: $facetValue\n      simulationBehavior: $simulationBehavior\n    ) {\n      count\n      products {\n        key: productId\n        id: productId\n        productName\n        linkText\n        productClusters {\n          id\n          name\n        }\n        items {\n          itemId\n          images {\n            imageUrl\n            imageText\n          }\n          sellers {\n            sellerId\n            commercialOffer: commertialOffer {\n              maxInstallments: Installments(criteria: MAX_WITHOUT_INTEREST) {\n                value: Value\n                numberOfInstallments: NumberOfInstallments\n              }\n              installments: Installments(criteria: ALL) {\n                value: Value\n                numberOfInstallments: NumberOfInstallments\n                interestRate: InterestRate\n              }\n              availableQuantity: AvailableQuantity\n              price: Price\n              listPrice: ListPrice\n              spotPrice\n              teasers {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
  sha256Hash: "6aeb14acf4f597ceb0ef2f3a9a5773c30cafd8adf981c2803786a04438bc8993",
  operationName: "ProductsSuggestionsQuery",
}
