import React from 'react'
import type { ReactNode, FormHTMLAttributes } from 'react'

import Form from '../../molecules/Form'

export type NewsletterProps = {
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
  /**
   * The Out of Stock Section's title.
   */
  title: string | ReactNode
  /**
   * Message describing when the user will be notified.
   */
  message?: string | ReactNode
  /**
   *
   */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  /**
   *
   */
  children: ReactNode
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'title'>

function Newsletter({
  testId = 'store-newsletter',
  title,
  message,
  children,
  ...formProps
}: NewsletterProps) {
  return (
    <section data-store-newsletter data-testid={testId} aria-live="polite">
      <Form data-store-newsletter-form testId={`${testId}-form`} {...formProps}>
        {typeof title === 'string' ? (
          <p data-store-newsletter-title data-testid={`${testId}-title`}>
            {title}
          </p>
        ) : (
          <div data-store-newsletter-title data-testid={`${testId}-title`}>
            {title}
          </div>
        )}

        {!!message &&
          (typeof title === 'string' ? (
            <p data-store-newsletter-message data-testid={`${testId}-message`}>
              {message}
            </p>
          ) : (
            <div
              data-store-newsletter-message
              data-testid={`${testId}-message`}
            >
              {message}
            </div>
          ))}
        {children}
      </Form>
    </section>
  )
}

export default Newsletter
