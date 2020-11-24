export const schema = gql`
  type Feed {
    id: Int!
    name: String!
    url: String!
    created: DateTime!
    lastRun: DateTime!
  }

  type Query {
    feeds: [Feed!]!
    feed(id: Int!): Feed
  }

  input CreateFeedInput {
    name: String!
    url: String!
    created: DateTime!
    lastRun: DateTime!
  }

  input UpdateFeedInput {
    name: String
    url: String
    created: DateTime
    lastRun: DateTime
  }

  type Mutation {
    createFeed(input: CreateFeedInput!): Feed!
    updateFeed(id: Int!, input: UpdateFeedInput!): Feed!
    deleteFeed(id: Int!): Feed!
  }
`
