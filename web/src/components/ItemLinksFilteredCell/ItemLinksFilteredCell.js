import { Link, routes } from '@redwoodjs/router'

import ItemLinks from 'src/components/ItemLinks'
import ItemLinkElement from 'src/components/ItemLinkElement';
/**
 * curl 'http://localhost:8911/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:8911' --data-binary '{"query":"query GET_ITEMS($filter: String!) {\n  allItems(filter:$filter) {\n    id\n    title\n    contentType\n    url\n    created\n    author\n  }\n}","variables":{"filter":"{\"id\":{\"equals\":1}}"}}' --compressed
 */
/*
export const beforeQuery = (props) => {
  console.log('itemlinkfilteredcell beforequery', props)
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
let setURLParams = function () {
  // this expects at least 2 parameters, sometimes 3
  // if 2, column = value
  // if 3, column operator value
  var args = Array.prototype.slice.call(arguments);
  //console.log(args);


  var column = args[0];
  var operator = (function () {
    if (args.length === 2) {
      return '=';
    } else {
      return args[1]
    }
  })();
  var value = (function () {
    if (args.length === 2) {
      return args[1];
    } else {
      return args[2]
    }
  })();
  //console.log(column, operator, value)
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  urlParams.delete('q');
  var urlQuery = urlParams.get('q') || urlParams.get('query') || '';
  //console.log('q', urlQuery);
  var queryArr = urlQuery.split('^');
  var output = urlQuery.split('^');
  var found = false;
  queryArr.forEach(function (query, index) {
    //now split by operators
    var operators = ['=', '!=', '>', '>=', '<', '<='];
    operators.forEach(function (op) {
      var queryParts = query.split(op);
      //console.log(op)
      if (query.includes(op)) {
        if (queryParts[0] === column) {
          found = true;
          //console.log(`matched urlparam(${query.split(op)[0]}) to column(${column})`)
          output[index] = `${column}${operator}${value}`;
          return `${column}${operator}${value}`
        }
      }
    })
    //console.log(output);
  });
  if (!found) {
    output.push(`${column}${operator}${value}`)
  }
  if (output[0] == "") { output = [`${column}${operator}${value}`]; }
  if (output.length > 0) {
    output = output.join('^');
  }
  //console.log('output', output);
  urlParams.set('q', output);
  //history.replaceState(null, '', '?' + urlParams + location.hash)
  window.location.href = '?' + urlParams.toString();
  return output;
}

let searchForm = (
<><form id="news-search" className="form-inline">
        <label className="sr-only" htmlFor="searchtext">Search</label>
        <div className="input-group col-md-10">
          <input type="text" className="form-control" id="searchtext" placeholder="Search (looks for title containing this)" onKeyPress={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setURLParams('title', '~', document.getElementById('searchtext').value)
            }
          }} />
        </div>
        <div className="col-md-2">
          <button onClick={() => { setURLParams('title', '~', document.getElementById('searchtext').value) }} type="button" id="submitquery" className="btn btn-primary">Submit</button>
        </div>
      </form>
      <span></span></>
)

export const Loading = () => <div>Loading...</div>

export const Empty = ({filter}) => <div>{filter}{searchForm}Empty</div>

export const Failure = ({ error }) => (<div>Error: {error.message}</div>)

export const Success = ({ allItems }) => {
  let rows = allItems.map((item, index) => (
    <tr key={item.id} scope="row">
      <td><time>{item.created.split('T')[0]}</time></td>
      <td><a href={item.url}>{item.title}</a></td>
      <td><ItemLinkElement element="author" item={item}></ItemLinkElement></td>
    </tr>
  ))
  return (
    <div>
      {searchForm}
      <table className="table table-hover">
        <thead>
          <tr>
            <td>Date</td>
            <td>Post</td>
            <td>Author</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>)
  //return JSON.stringify(allItems)
}
