import { db } from 'src/lib/db'
import rssParser from 'rss-parser'
import pullFeed from './rules/pullFeed';
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

export const pullFeed2 = async ({ id }) => {
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
  async function successCallback(result) {
    await db.itemLink.create({
      data: {
        updated: new Date(),
        created: new Date(),
        url: "item.link",
        author: theFeed.name,
        title: "item.title",
        rendered: 0,
        clicked: 0,
        contentType: "fromgraphql"
      }
    }).then((success)=>{console.log('db insert success', success)})
    result.items.length = 1;
    console.log("Success", result);
    result.items.forEach((item) => {
      var mappedItem = {
        updated: new Date(item.isoDate),
        created: new Date(),
        url: item.link,
        author: theFeed.name,
        title: item.title,
        rendered: 0,
        clicked: 0,
        contentType: "fromgraphql"
      }
      console.log('trying to insert', mappedItem)
      db.itemLink.create({
        data: mappedItem
      })
    })
    return "Hello"
  }

  function failureCallback(error) {
    console.error("Error: " + error);
    console.log(error);
  }
  let output = getFeed(theFeed).then(successCallback, failureCallback)
  return output;
}
