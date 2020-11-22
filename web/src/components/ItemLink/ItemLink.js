import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/ItemLinksCell'

const DELETE_ITEM_LINK_MUTATION = gql`
  mutation DeleteItemLinkMutation($id: Int!) {
    deleteItemLink(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const ItemLink = ({ itemLink }) => {
  const { addMessage } = useFlash()
  const [deleteItemLink] = useMutation(DELETE_ITEM_LINK_MUTATION, {
    onCompleted: () => {
      navigate(routes.itemLinks())
      addMessage('ItemLink deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete itemLink ' + id + '?')) {
      deleteItemLink({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ItemLink {itemLink.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{itemLink.id}</td>
            </tr>
            <tr>
              <th>Updated</th>
              <td>{timeTag(itemLink.updated)}</td>
            </tr>
            <tr>
              <th>Created</th>
              <td>{timeTag(itemLink.created)}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{itemLink.url}</td>
            </tr>
            <tr>
              <th>Author</th>
              <td>{itemLink.author}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{itemLink.title}</td>
            </tr>
            <tr>
              <th>Rendered</th>
              <td>{itemLink.rendered}</td>
            </tr>
            <tr>
              <th>Clicked</th>
              <td>{itemLink.clicked}</td>
            </tr>
            <tr>
              <th>Content type</th>
              <td>{itemLink.contentType}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editItemLink({ id: itemLink.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(itemLink.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default ItemLink
