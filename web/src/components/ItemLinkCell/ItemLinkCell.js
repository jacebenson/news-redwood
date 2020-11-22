import ItemLink from 'src/components/ItemLink'

export const QUERY = gql`
  query FIND_ITEM_LINK_BY_ID($id: Int!) {
    itemLink: itemLink(id: $id) {
      id
      updated
      created
      url
      author
      title
      rendered
      clicked
      contentType
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ItemLink not found</div>

export const Success = ({ itemLink }) => {
  return <ItemLink itemLink={itemLink} />
}
