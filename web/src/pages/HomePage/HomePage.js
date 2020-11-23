import { Link, routes } from '@redwoodjs/router'
import SiteLayout from 'src/layouts/SiteLayout'
import ItemLinksFilteredCell from 'src/components/ItemLinksFilteredCell'
import { useParams } from '@redwoodjs/router'

const HomePage = () => {
  let operators = [
    {symbol: "!=", value:"not"},
    {symbol:"=", value:"equals"},
    //{symbol:"<=", value:"lte"},
    //{symbol:">=", value:"gte"},
    {symbol:"<", value:"lt"},
    {symbol:">", value:"gt"},
    {symbol:"⊃", value:"contains"},
    {symbol:"~", value:"contains"},
    {symbol:"*", value:"in"}
  ];
  let querySeperators = [
    '^'
  ];
  let sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7);
  sevenDaysAgo = sevenDaysAgo.toISOString().split('T')[0];
  let urlQueries = useParams().query || useParams().q || "created>" + sevenDaysAgo
  console.log('urlQueries',urlQueries)
  let setQueries = function(query){
    operators.forEach((operator)=>{
      if(query.indexOf(operator.symbol)>=0){
        console.log(operator.symbol, query)
        var field = query.split(operator.symbol)[0];
        var value = query.split(operator.symbol)[1];
        console.log('value',value);
        var date = new Date(value);
        if(isNaN(parseFloat(value))==false){
          value = parseFloat(value);
        }
        if(date instanceof Date && !isNaN(date.valueOf())){
          value = date.toISOString();
        }
        if(field.indexOf('!') < 0){
          var queryLineObj = {}
          queryLineObj[field] = {};
          queryLineObj[field][operator.value] = value;
          console.log('queryLineObj', queryLineObj)
          queryItems.push(queryLineObj);
        }
      }
    })
  }
  let queryItems = [];
  querySeperators.forEach((seperator)=>{
    var queries = urlQueries.split(seperator);
    console.log('queries.length', queries.length)
    if(queries.length>1){
      queries.forEach((query, index)=>{
        setQueries(query);
      })
    } else {
      setQueries(urlQueries)
    }
  })
  let queryObj = {};
  /*
  if (urlQueries.indexOf('^') >= 0) {
    //multiple queries
    let queryArr = urlQueries.split('^');
    queryArr = queryArr.map((urlQuery) => {
      var field = urlQuery.split('=')[0];
      var value = urlQuery.split('=')[1];
      queryObj[field] = value;
    })
  } else {
    var field = query.split('=')[0];
    var value = query.split('=')[1];
    queryObj[field] = { equals: value };
  }
  */
  queryObj = JSON.stringify({AND: queryItems});
  console.log(queryObj);
  return (
    <>
      <SiteLayout>
      <hr></hr>
        <div className="container">
        <form id="news-search" className="form-inline">
          <label className="sr-only" htmlFor="searchtext">Search</label>
          <div className="input-group col-md-10">
            <input type="text" className="form-control" id="searchtext" placeholder="Search (looks for type, site, author, or title containing this)" />
          </div>
          <div className="col-md-2">
          <button type="button" id="submitquery" className="btn btn-primary">Submit</button>
          </div>

        </form>

        {queryObj}
        <hr/>
        <ItemLinksFilteredCell filter={queryObj} />
        </div>
      </SiteLayout>
    </>
  )
}

export default HomePage
