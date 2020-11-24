import FeedsLayout from 'src/layouts/FeedsLayout'
import EditFeedCell from 'src/components/EditFeedCell'

const EditFeedPage = ({ id }) => {
  return (
    <FeedsLayout>
      <EditFeedCell id={id} />
    </FeedsLayout>
  )
}

export default EditFeedPage
