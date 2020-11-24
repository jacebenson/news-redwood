import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/FeedsCell'

const DELETE_FEED_MUTATION = gql`
  mutation DeleteFeedMutation($id: Int!) {
    deleteFeed(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const FeedsList = ({ feeds }) => {
  const { addMessage } = useFlash()
  const [deleteFeed] = useMutation(DELETE_FEED_MUTATION, {
    onCompleted: () => {
      addMessage('Feed deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete feed ' + id + '?')) {
      deleteFeed({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Url</th>
            <th>Created</th>
            <th>Last run</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {feeds.map((feed) => (
            <tr key={feed.id}>
              <td>{truncate(feed.id)}</td>
              <td>{truncate(feed.name)}</td>
              <td>{truncate(feed.url)}</td>
              <td>{timeTag(feed.created)}</td>
              <td>{timeTag(feed.lastRun)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.feed({ id: feed.id })}
                    title={'Show feed ' + feed.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFeed({ id: feed.id })}
                    title={'Edit feed ' + feed.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete feed ' + feed.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(feed.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FeedsList
