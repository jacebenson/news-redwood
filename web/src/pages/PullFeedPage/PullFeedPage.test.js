import { render } from '@redwoodjs/testing'

import PullFeedPage from './PullFeedPage'

describe('PullFeedPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PullFeedPage />)
    }).not.toThrow()
  })
})
