import { db } from 'src/lib/db'
import fetch  from 'node-fetch'
import Feed from 'rss-to-json'

import { requireAuth } from 'src/lib/auth'

export const feeds = () => {
  return db.feed.findMany()
}

export const feed = ({ id }) => {
  return db.feed.findOne({
    where: { id },
  })
}

export const createFeed = ({ input }) => {
  return db.feed.create({
    data: input,
  })
}

export const updateFeed = ({ id, input }) => {
  return db.feed.update({
    data: input,
    where: { id },
  })
}

export const deleteFeed = ({ id }) => {
  return db.feed.delete({
    where: { id },
  })
}

export const pullFeed = async ({ id, url }) => {
  //requireAuth()
  console.log(url);
  db.itemLink.create({
    data: {

      updated: new Date(),
      created: new Date(),
      url: "asdf",
      author: "asdf",
      title: "feed.title",
      rendered: 0,
      clicked: 0,
      contentType: 'fromgraphql'
    }
  })
  const response = await Feed.load(url)
  var updated = 0;
  response.items.length = 1;
    var items = response.items.map((feed, index)=>{
      var item = {

        updated: new Date(),
        created: new Date(feed.created),
        url: feed.url,
        author: "?",
        title: feed.title,
        rendered: 0,
        clicked: 0,
        contentType: 'fromgraphql'
      }
      console.log('trying to insert', item);
      /**
    updated: DateTime!
    created: DateTime!
    url: String!
    author: String!
    title: String!
    rendered: Int!
    clicked: Int!
    contentType: String!
       */

      db.itemLink.create({
        data: item
      }).then((item)=>{
        console.log(item);
//updated++
      })
      if(index === (response.items.length-1)){
        return {
          id: id,
          url: url,
          created: new Date(),
          lastRun: new Date(),
          name: response.items.length
        }
      }
    })
/**
 * Query
 * query FIND_FEED_BY_ID($id: Int!, $url: String!) {
  pullFeed(id: $id, url: $url) {
    id
    name
    url
    created
    lastRun
  }
}
// variables
{
  "id": 1,
  "url": "https://andrew.alburydor.com/posts/index.xml"
}
//TODO try rss-parser instead
 */

}
