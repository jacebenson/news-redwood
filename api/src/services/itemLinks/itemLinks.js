import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

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
