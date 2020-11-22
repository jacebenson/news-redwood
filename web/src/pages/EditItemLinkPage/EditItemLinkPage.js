import ItemLinksLayout from 'src/layouts/ItemLinksLayout'
import EditItemLinkCell from 'src/components/EditItemLinkCell'

const EditItemLinkPage = ({ id }) => {
  return (
    <ItemLinksLayout>
      <EditItemLinkCell id={id} />
    </ItemLinksLayout>
  )
}

export default EditItemLinkPage
