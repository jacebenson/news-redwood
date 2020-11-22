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
    '^OR',
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
        if(date instanceof Date && !isNaN(date.valueOf())){
          value = date.toISOString();
        } else if(isNaN(parseFloat(value))==false){
          value = parseFloat(value);
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
  //"{\"AND\":[{\"author\":{\"equals\":\"Beth_Carlson\"}}]}"
  let queryItems = [];
  querySeperators.forEach((seperator)=>{
    var queries = urlQueries.split(seperator);
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
        <h1>HomePage</h1>
      Loading {queryObj}
        <ItemLinksFilteredCell filter={queryObj} />
      </SiteLayout>
    </>
  )
}

export default HomePage
