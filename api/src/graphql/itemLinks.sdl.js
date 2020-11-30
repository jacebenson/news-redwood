export const schema = gql`
  type ItemLink {
    id: Int!
    updated: DateTime!
    created: DateTime!
    url: String!
    author: String!
    title: String!
    rendered: Int!
    clicked: Int!
    contentType: String!
  }
  type Query {
    itemLinks: [ItemLink!]!
    allItems(filter: String!): [ItemLink!]!
    allItemsJSON(filter: JSON!): [ItemLink!]!
    itemLink(id: Int!): ItemLink
  }

  input CreateItemLinkInput {
    updated: DateTime!
    created: DateTime!
    url: String!
    author: String!
    title: String!
    rendered: Int!
    clicked: Int!
    contentType: String!
  }

  input UpdateItemLinkInput {
    updated: DateTime
    created: DateTime
    url: String
    author: String
    title: String
    rendered: Int
    clicked: Int
    contentType: String
  }

  type Mutation {
    createItemLink(input: CreateItemLinkInput!): ItemLink!
    updateItemLink(id: Int!, input: UpdateItemLinkInput!): ItemLink!
    deleteItemLink(id: Int!): ItemLink!
    pullLinks(id: Int!): ItemLink!
  }
`
