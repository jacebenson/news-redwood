
import FeedsLayout from 'src/layouts/FeedsLayout'
import PullFeedLinksCell from 'src/components/PullFeedLinksCell'
import SiteLayout from 'src/layouts/SiteLayout/SiteLayout'
import { Link, routes } from '@redwoodjs/router'

const PullFeedPage = ({ id }) => {
  return (
    <SiteLayout containerClass="container">
    <FeedsLayout>
      <PullFeedLinksCell id={id} />
    </FeedsLayout>
    </SiteLayout>
  )
}

export default PullFeedPage
