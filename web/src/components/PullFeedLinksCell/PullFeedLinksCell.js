import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import FeedForm from 'src/components/FeedForm'
export const QUERY = gql`
query FIND_FEED_BY_ID($id: Int!) {
  feed: feed(id: $id) {
    id
    name
    url
    created
    lastRun
  }
}
`
const UPDATE_FEED_MUTATION = gql`
mutation UpdateFeedMutation($id: Int!, $input: UpdateFeedInput!) {
  updateFeed(id: $id, input: $input) {
    id
    name
    url
    created
    lastRun
  }
}
`


export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Loading = () => <div>Loading...</div>

export const Success = ({ feed }) => {
  const { addMessage } = useFlash()
  const [updateFeed, { loading, error }] = useMutation(UPDATE_FEED_MUTATION, {
    onCompleted: () => {
      navigate(routes.feeds())
      addMessage('Feed updated.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input, id) => {
    updateFeed({ variables: { id, input } })
  }



  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Feed {feed.id}</h2>
      </header>
      <div className="rw-segment-main">
        Test
      </div>
    </div>
  )
}
//<FeedForm feed={feed} onSave={onSave} error={error} loading={loading} />
