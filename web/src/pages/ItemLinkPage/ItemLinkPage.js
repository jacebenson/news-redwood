import ItemLinksLayout from 'src/layouts/ItemLinksLayout'
import ItemLinkCell from 'src/components/ItemLinkCell'

const ItemLinkPage = ({ id }) => {
  return (
    <ItemLinksLayout>
      <ItemLinkCell id={id} />
    </ItemLinksLayout>
  )
}

export default ItemLinkPage
