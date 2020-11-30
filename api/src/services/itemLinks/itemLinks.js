import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import rssParser from 'rss-parser'

export const itemLinks = () => {
  requireAuth();
  return db.itemLink.findMany()
}
export const allItems = ({ filter }) => {
  //console.log(JSON.stringify(filter,'',' '));
  filter = JSON.parse(filter);
  return db.itemLink.findMany({
    where: filter,
    orderBy: { created: "desc"}
  })
}
export const allItemsJSON = ({ filter }) => {
  //console.log(JSON.stringify(filter,'',' '));
  //filter = JSON.parse(filter);
  return db.itemLink.findMany({
    where: filter,
    orderBy: { created: "desc"}
  })
}
export const itemLink = ({ id }) => {
  return db.itemLink.findOne({
    where: { id },
  })
}

export const createItemLink = ({ input }) => {
  requireAuth()
  return db.itemLink.create({
    data: input,
  })
}

export const updateItemLink = ({ id, input }) => {
  requireAuth()
  return db.itemLink.update({
    data: input,
    where: { id },
  })
}

export const deleteItemLink = ({ id }) => {
  requireAuth()
  return db.itemLink.delete({
    where: { id },
  })
}

export const pullLinks = async ({ id }) => {
  try{
    //updated the db.feed where id is feed's id with a new "lastrun"
    //after feed is updated, read the rss feed/endpoint
    //for each link found, upsert a record in db.itemlink

    let theFeed = await db.feed.update({
      data: {
        lastRun: new Date()
      },
      where: { id },
    })
    console.log('theFeed', theFeed)
    let getFeed = async function (feedObj) {
      let parser = new rssParser()
      console.log('pulling', feedObj.url);
      const response = await parser.parseURL(feedObj.url)
      return response;
    }
    function successCallback(result) {
      var now = new Date()
      result.items.length = 1;
      console.log("Success", result.items);
      let items = result.items.forEach(async (item) => {
        var mappedItem = {
          updated: new Date(item.isoDate),
          created: new Date(),
          url: item.link + "&date...=" + now.toISOString(),
          author: theFeed.name,
          title: item.title,
          rendered: 0,
          clicked: 0,
          contentType: "fromgraphql"
        }
        console.log('trying to insert', mappedItem)
        //this fails to insert due to some id business...
        return await db.itemLink.create({
          data: mappedItem
        })
      })
      Promise.all(items).then((completed) => {
        console.log('completed', completed)
        return completed
      })
      //return "Hello"
      //console.log(items);
      //return items
    }

    function failureCallback(error) {
      console.error("Error: " + error);
      console.log(error);
    }
    let output = getFeed(theFeed).then(successCallback, failureCallback)
    return output;

  }catch(e){console.log(e)}
  /*
    */
}
