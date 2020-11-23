import ItemLinksLayout from 'src/layouts/ItemLinksLayout'
import EditItemLinkCell from 'src/components/EditItemLinkCell'

import SiteLayout from 'src/layouts/SiteLayout'
const EditItemLinkPage = ({ id }) => {
  return (
    <SiteLayout>
    <ItemLinksLayout>
      <EditItemLinkCell id={id} />
    </ItemLinksLayout>
    </SiteLayout>
  )
}

export default EditItemLinkPage
