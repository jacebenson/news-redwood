import { Link, routes } from '@redwoodjs/router'

import ItemLinks from 'src/components/ItemLinks'
/**
 * curl 'http://localhost:8911/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:8911' --data-binary '{"query":"query GET_ITEMS($filter: String!) {\n  allItems(filter:$filter) {\n    id\n    title\n    contentType\n    url\n    created\n    author\n  }\n}","variables":{"filter":"{\"id\":{\"equals\":1}}"}}' --compressed
 */
/*
export const beforeQuery = (props) => {
  console.log('props',props)
  return {
    variables: props,
    fetchPolicy: 'network-only',
  }
}*/

export const QUERY = gql`
query ITEM_LINKS($filter: String!) {
  allItems(filter:$filter) {
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

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (<div>Error: {error.message}</div>)

export const Success = ({ allItems }) => {
  let rows = allItems.map((item,index)=>(
      <tr key={item.id}>
        <td>{item.id}</td>
        <td><time>{item.created.split('T')[0]}</time></td>
        <td><Link to={item.url}>{item.title}</Link></td>
        <td>{item.author}</td>
      </tr>
  ))
  return (<table>
  <thead>
    <tr>
      <td>ID</td>
      <td>Date</td>
      <td>Post</td>
      <td>Author</td>
    </tr>
  </thead>
    <tbody>
    {rows}
    </tbody>
  </table>)
  //return JSON.stringify(allItems)
}
