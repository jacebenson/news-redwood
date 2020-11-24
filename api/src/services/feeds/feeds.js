import { db } from 'src/lib/db'

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
