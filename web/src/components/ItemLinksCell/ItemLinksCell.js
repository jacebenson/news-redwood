import { Link, routes } from '@redwoodjs/router'

import ItemLinks from 'src/components/ItemLinks'

export const QUERY = gql`
  query ITEM_LINKS {
    itemLinks {
      id
      updated
      created
      url
      author
      title
      rendered
      clicked
      contentType
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No itemLinks yet. '}
      <Link to={routes.newItemLink()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ itemLinks }) => {
  return <ItemLinks itemLinks={itemLinks} />
}
