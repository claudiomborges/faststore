import {
  Box,
  SearchSuggestionsList,
  SearchSuggestionsListTitle,
  useSearchSuggestionsContext,
  SearchSuggestionsListContainer,
} from '@vtex/store-ui'
import React, { FC } from 'react'

import { useSearchHistory } from '../../sdk/search/useSearchHistory'

interface Props {
  variant?: string
  title: string
}

const Icon = () => (
  <svg
    className="vtex__icon-clock  "
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 22 10"
    fill="none"
  >
    <path
      d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14Z"
      fill="currentColor"
    />
    <path
      d="M2 0H0V5H5V3H2V0Z"
      transform="translate(7 4)"
      fill="currentColor"
    />
  </svg>
)

const SearchSuggestionsHistory: FC<Props> = ({
  title,
  variant = 'history',
}) => {
  const { onSearch } = useSearchSuggestionsContext()
  const history = useSearchHistory()
  const searches = history?.get().map((t) => ({ term: t, key: t }))

  if (!searches || searches.length === 0) {
    return <SearchSuggestionsListContainer variant={variant} />
  }

  return (
    <SearchSuggestionsListContainer variant={variant}>
      <SearchSuggestionsListTitle variant={variant} title={title} />
      <SearchSuggestionsList items={searches} variant={variant}>
        {({ item: { term }, variant: v }) => (
          <Box onClick={() => onSearch(term)} variant={v}>
            <span>
              <Icon />
            </span>
            {term}
          </Box>
        )}
      </SearchSuggestionsList>
    </SearchSuggestionsListContainer>
  )
}

export default SearchSuggestionsHistory
