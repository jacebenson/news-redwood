import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/ItemLinksCell'

const DELETE_ITEM_LINK_MUTATION = gql`
  mutation DeleteItemLinkMutation($id: Int!) {
    deleteItemLink(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const ItemLinksList = ({ itemLinks }) => {
  const { addMessage } = useFlash()
  const [deleteItemLink] = useMutation(DELETE_ITEM_LINK_MUTATION, {
    onCompleted: () => {
      addMessage('ItemLink deleted.', { classes: 'rw-flash-success' })
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete itemLink ' + id + '?')) {
      deleteItemLink({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Updated</th>
            <th>Created</th>
            <th>Url</th>
            <th>Author</th>
            <th>Title</th>
            <th>Rendered</th>
            <th>Clicked</th>
            <th>Content type</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {itemLinks.map((itemLink) => (
            <tr key={itemLink.id}>
              <td>{truncate(itemLink.id)}</td>
              <td>{timeTag(itemLink.updated)}</td>
              <td>{timeTag(itemLink.created)}</td>
              <td>{truncate(itemLink.url)}</td>
              <td>{truncate(itemLink.author)}</td>
              <td>{truncate(itemLink.title)}</td>
              <td>{truncate(itemLink.rendered)}</td>
              <td>{truncate(itemLink.clicked)}</td>
              <td>{truncate(itemLink.contentType)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.itemLink({ id: itemLink.id })}
                    title={'Show itemLink ' + itemLink.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editItemLink({ id: itemLink.id })}
                    title={'Edit itemLink ' + itemLink.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete itemLink ' + itemLink.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(itemLink.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ItemLinksList
