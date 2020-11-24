import FeedsLayout from 'src/layouts/FeedsLayout'
import FeedCell from 'src/components/FeedCell'

const FeedPage = ({ id }) => {
  return (
    <FeedsLayout>
      <FeedCell id={id} />
    </FeedsLayout>
  )
}

export default FeedPage
