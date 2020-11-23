import ItemLinksLayout from 'src/layouts/ItemLinksLayout'
import ItemLinksCell from 'src/components/ItemLinksCell'
import SiteLayout from 'src/layouts/SiteLayout'
const ItemLinksPage = () => {
  return (

    <SiteLayout>
    <ItemLinksLayout>
      <ItemLinksCell />
    </ItemLinksLayout>

    </SiteLayout>
  )
}

export default ItemLinksPage
