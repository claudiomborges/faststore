import { gql } from '@vtex/gatsby-plugin-graphql'

import { useQuery } from '../../../sdk/graphql/useQuery'
import { useRegion } from '../../../sdk/region/useRegion'
import { useSearchSuggestionsContext } from '../base/hooks'
import { ProductsSuggestionsQuery } from './__generated__/ProductsSuggestionsQuery.graphql'
import type {
  ProductsSuggestionsQueryQuery,
  ProductsSuggestionsQueryQueryVariables,
} from './__generated__/ProductsSuggestionsQuery.graphql'

interface Props {
  term: string
  maxItems: number // max number of products to return. Hard limit of 5
}

export const useProductsSuggestions = ({ maxItems, term }: Props) => {
  const regionContext = useRegion()
  const context = useSearchSuggestionsContext()
  const response = useQuery<
    ProductsSuggestionsQueryQuery,
    ProductsSuggestionsQueryQueryVariables
  >({
    ...ProductsSuggestionsQuery,
    variables: {
      fullText: term,
      regionId: regionContext.regionId,
    },
    suspense: false,
  })

  const query = {
    ...response,
    data: response.data && {
      vtex: {
        productSuggestions: {
          count: response.data.vtex.productSuggestions?.count,
          products: response.data.vtex.productSuggestions?.products.slice(
            0,
            maxItems
          ),
        },
      },
    },
  }

  return {
    query,
    ...context,
  }
}

export const query = gql`
  query ProductsSuggestionsQuery(
    $fullText: String!
    $regionId: String
    $facetKey: String
    $facetValue: String
    $simulationBehavior: VTEX_SimulationBehavior = default
  ) {
    vtex {
      productSuggestions(
        fullText: $fullText
        regionId: $regionId
        facetKey: $facetKey
        facetValue: $facetValue
        simulationBehavior: $simulationBehavior
      ) {
        count
        products {
          key: productId
          ...ProductSummary_product
        }
      }
    }
  }
`