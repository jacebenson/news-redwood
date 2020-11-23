import ItemLinksLayout from 'src/layouts/ItemLinksLayout'
import NewItemLink from 'src/components/NewItemLink'
import SiteLayout from 'src/layouts/SiteLayout'

const NewItemLinkPage = () => {
  return (
    <SiteLayout>
    <ItemLinksLayout>
      <NewItemLink />
    </ItemLinksLayout>
    </SiteLayout>
  )
}

export default NewItemLinkPage
