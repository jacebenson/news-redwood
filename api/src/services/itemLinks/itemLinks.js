import { db } from 'src/lib/db'

export const itemLinks = () => {
  return db.itemLink.findMany()
}
export const allItems = ({ filter }) => {
  //console.log(JSON.stringify(filter,'',' '));
  filter = JSON.parse(filter);
  return db.itemLink.findMany({
    where: filter
  })
}

export const itemLink = ({ id }) => {
  return db.itemLink.findOne({
    where: { id },
  })
}

export const createItemLink = ({ input }) => {
  return db.itemLink.create({
    data: input,
  })
}

export const updateItemLink = ({ id, input }) => {
  return db.itemLink.update({
    data: input,
    where: { id },
  })
}

export const deleteItemLink = ({ id }) => {
  return db.itemLink.delete({
    where: { id },
  })
}
