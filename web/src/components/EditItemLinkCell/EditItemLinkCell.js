import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ItemLinkForm from 'src/components/ItemLinkForm'

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
const UPDATE_ITEM_LINK_MUTATION = gql`
  mutation UpdateItemLinkMutation($id: Int!, $input: UpdateItemLinkInput!) {
    updateItemLink(id: $id, input: $input) {
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

export const Success = ({ itemLink }) => {
  const { addMessage } = useFlash()
  const [updateItemLink, { loading, error }] = useMutation(
    UPDATE_ITEM_LINK_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.itemLinks())
        addMessage('ItemLink updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateItemLink({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ItemLink {itemLink.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ItemLinkForm
          itemLink={itemLink}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
