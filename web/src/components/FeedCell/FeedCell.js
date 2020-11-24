import Feed from 'src/components/Feed'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Feed not found</div>

export const Success = ({ feed }) => {
  return <Feed feed={feed} />
}
