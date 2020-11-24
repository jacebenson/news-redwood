import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/FeedsCell'

const DELETE_FEED_MUTATION = gql`
  mutation DeleteFeedMutation($id: Int!) {
    deleteFeed(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Feed = ({ feed }) => {
  const { addMessage } = useFlash()
  const [deleteFeed] = useMutation(DELETE_FEED_MUTATION, {
    onCompleted: () => {
      navigate(routes.feeds())
      addMessage('Feed deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete feed ' + id + '?')) {
      deleteFeed({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Feed {feed.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{feed.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{feed.name}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{feed.url}</td>
            </tr>
            <tr>
              <th>Created</th>
              <td>{timeTag(feed.created)}</td>
            </tr>
            <tr>
              <th>Last run</th>
              <td>{timeTag(feed.lastRun)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFeed({ id: feed.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(feed.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Feed
