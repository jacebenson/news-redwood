import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ItemLinkForm from 'src/components/ItemLinkForm'

import { QUERY } from 'src/components/ItemLinksCell'

const CREATE_ITEM_LINK_MUTATION = gql`
  mutation CreateItemLinkMutation($input: CreateItemLinkInput!) {
    createItemLink(input: $input) {
      id
    }
  }
`

const NewItemLink = () => {
  const { addMessage } = useFlash()
  const [createItemLink, { loading, error }] = useMutation(
    CREATE_ITEM_LINK_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.itemLinks())
        addMessage('ItemLink created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createItemLink({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ItemLink</h2>
      </header>
      <div className="rw-segment-main">
        <ItemLinkForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewItemLink
