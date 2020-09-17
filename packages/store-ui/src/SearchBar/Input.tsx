import React, { FC, useEffect, useRef } from 'react'
import { Box, Input, InputProps } from 'theme-ui'
import { usePopoverState, Popover, PopoverDisclosure } from 'reakit/Popover'

import { useSearchBarContext } from './hooks'

type Props = Omit<InputProps, 'ref'>

export const SearchBarInput: FC<Props> = ({
  variant,
  children,
  ...forward
}) => {
  const popover = usePopoverState({ placement: 'bottom-start' })
  const ref = useRef<HTMLInputElement>(null)
  const { term, setTerm, onSearch } = useSearchBarContext()

  useEffect(() => {
    if (popover.visible) {
      ref.current?.focus()
    }
  }, [popover.visible])

  return (
    <>
      <Box variant={`${variant}.textInput`}>
        <PopoverDisclosure {...popover}>
          <Input
            ref={ref}
            onChange={(e) => {
              setTerm(e.target.value)
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && term) {
                onSearch(term)
              }
            }}
            {...forward}
          />
        </PopoverDisclosure>
        <Popover
          tabIndex={0}
          aria-label="Searchbar Input"
          style={{ width: 'inherit' }}
          {...popover}
        >
          {popover.visible ? children : null}
        </Popover>
      </Box>
    </>
  )
}
