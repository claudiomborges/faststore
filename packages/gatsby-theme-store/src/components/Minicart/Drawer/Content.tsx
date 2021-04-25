import React from 'react'
import { Flex, Text } from 'theme-ui'
import type { FC } from 'react'
import { useIntl } from '@vtex/gatsby-plugin-i18n'

import { useNumberFormat } from '../../../sdk/localization/useNumberFormat'
import MinicartDelete from './Delete'
import { HeaderMinicartDrawerContentImage } from './Image'
import MinicartQuantity from './Quantity'
import type { OrderForm } from '../../../sdk/orderForm/Provider'
import { IMAGE_DEFAULT } from '../../../sdk/product/constants'

export interface MinicartContentProps {
  data: NonNullable<OrderForm>['items']
  variant: string
  imageElement: React.ElementType
}

export const freeVariant = (price: Maybe<number>) =>
  price === 0 ? '.free' : ''

export const HeaderMinicartDrawerContent: FC<MinicartContentProps> = ({
  data,
  variant: v,
  imageElement,
}) => {
  const { format } = useNumberFormat()
  const { formatMessage } = useIntl()
  const variant = `${v}.content`

  return (
    <Flex variant={variant}>
      {data.map((item, idx) => (
        <Flex key={item.id} variant={`${variant}.product`}>
          <HeaderMinicartDrawerContentImage
            as={imageElement}
            src={item.imageUrls?.at2x ?? IMAGE_DEFAULT}
            alt={item.name!}
            variant={`${variant}.product.image`}
          />
          <Flex variant={`${variant}.product.name`}>
            <Flex>
              <Text variant={`${variant}.product.name.text`}>{item.name}</Text>
              <MinicartDelete index={idx} variant={variant} />
            </Flex>
            <MinicartQuantity
              index={idx}
              isDisabled={item.sellingPrice === 0}
              variant={`${variant}${freeVariant(item.sellingPrice)}`}
            />
            <Text
              variant={`${variant}.product.name.value${freeVariant(
                item.sellingPrice
              )}`}
            >
              {item.sellingPrice === 0
                ? formatMessage({ id: 'minicart.price.free' })
                : format(Number(item.sellingPrice) / 100)}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}