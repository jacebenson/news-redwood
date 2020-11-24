import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import FeedForm from 'src/components/FeedForm'

import { QUERY } from 'src/components/FeedsCell'

const CREATE_FEED_MUTATION = gql`
  mutation CreateFeedMutation($input: CreateFeedInput!) {
    createFeed(input: $input) {
      id
    }
  }
`

const NewFeed = () => {
  const { addMessage } = useFlash()
  const [createFeed, { loading, error }] = useMutation(CREATE_FEED_MUTATION, {
    onCompleted: () => {
      navigate(routes.feeds())
      addMessage('Feed created.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input) => {
    createFeed({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Feed</h2>
      </header>
      <div className="rw-segment-main">
        <FeedForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFeed
