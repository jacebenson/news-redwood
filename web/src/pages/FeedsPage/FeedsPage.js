import FeedsLayout from 'src/layouts/FeedsLayout'
import FeedsCell from 'src/components/FeedsCell'
import SiteLayout from 'src/layouts/SiteLayout'
const FeedsPage = () => {
  return (
    <SiteLayout>
      <FeedsLayout>
        <FeedsCell />
      </FeedsLayout>
    </SiteLayout>
  )
}

export default FeedsPage
