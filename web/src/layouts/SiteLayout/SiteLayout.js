import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
const SiteLayout = ({ children }) => {
  const { logIn } = useAuth()
  return (
    <div>
      <h1>
        <Link to={routes.home()}>Redwood Blog</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to={routes.home()}>Home</Link>
          </li>
          <li>
          <button onClick={logIn}>
            Log In
          </button>
          </li>
          </ul>
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default SiteLayout
