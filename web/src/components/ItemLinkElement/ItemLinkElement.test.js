import { render } from '@redwoodjs/testing'

import ItemLinkFilteredElement from './ItemLinkElement'

describe('ItemLinkFilteredElement', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ItemLinkFilteredElement />)
    }).not.toThrow()
  })
})
