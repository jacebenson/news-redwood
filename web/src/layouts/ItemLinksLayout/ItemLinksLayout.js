import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

const ItemLinksLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Flash timeout={1000} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.itemLinks()} className="rw-link">
            ItemLinks
          </Link>
        </h1>
        <Link to={routes.newItemLink()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New ItemLink
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default ItemLinksLayout
