import {Redirect, routes} from '@redwoodjs/router'
import './ItemLinkElement.css'
const ItemLinkElement = (props) => {
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
    var urlQuery = urlParams.get('q') || urlParams.get('query') || '';
    //console.log('q', urlQuery);
    var queryArr = urlQuery.split('^');
    var output = urlQuery.split('^');
    var found = false;
    queryArr.forEach(function(query, index){
        //now split by operators
        var operators = ['=','!=','>','>=','<','<='];
        operators.forEach(function(op){
            var queryParts = query.split(op);
            //console.log(op)
            if(query.includes(op)){
                if(queryParts[0] === column){
                    found = true;
                    //console.log(`matched urlparam(${query.split(op)[0]}) to column(${column})`)
                    output[index] = `${column}${operator}${value}`;
                    return `${column}${operator}${value}`
                }
            }
        })
        //console.log(output);
    });
    if(!found){
        output.push(`${column}${operator}${value}`)
    }
    if(output[0] == ""){output = [`${column}${operator}${value}`];}
    if(output.length>0){
        output = output.join('^');
    }
    //console.log('output', output);
    urlParams.set('q',output);
    //history.replaceState(null, '', '?' + urlParams + location.hash)
    window.location.href = '?' + urlParams.toString();
    return output;
}

  let value = props.item[props.element];
  let field = props.element;
  let menuId = props.item.id + '-' + field;
  let toggleMenu = function(){
    console.log(props)
    console.log(props.item[props.element])
    console.log('getting element with ', menuId);
    var menu = window.document.getElementById(menuId);
    console.log('menu element', menu)
    menu.classList.toggle('hidden');
  }
  let searchWith = function(field, value){
    setURLParams(field, value);
    return <Redirect to={routes.home()} />
  }
  let searchWithOut = function(field, value){
    setURLParams(field, '!=', value);

  }
  let clearAll = function(field, value){
    urlParams.delete('q')
    history.replaceState(null, '', '?' + urlParams + location.hash)
    window.location.href = '?' + urlParams.toString();
  }
  return (
    <div>
      <span className="itemLinkElementValue">{value}</span>
      <span onClick={()=>toggleMenu()} className="itemLinkElementMenu">☰</span>
      <div id={props.item.id + '-' + field} className="context-menu hidden" >
		<ul>
			<li onClick={()=>searchWith(field, value)}>Show Matching</li>
			<li onClick={()=>searchWithOut(field, value)}>Show non-matching</li>
			<li onClick={()=>clearAll()}>Clear All Filters</li>
		</ul>
	</div>
    </div>
  )
}

export default ItemLinkElement
