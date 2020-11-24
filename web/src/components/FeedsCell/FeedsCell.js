import { Link, routes } from '@redwoodjs/router'

import Feeds from 'src/components/Feeds'

export const QUERY = gql`
  query FEEDS {
    feeds {
      id
      name
      url
      created
      lastRun
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No feeds yet. '}
      <Link to={routes.newFeed()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ feeds }) => {
  return <Feeds feeds={feeds} />
}
