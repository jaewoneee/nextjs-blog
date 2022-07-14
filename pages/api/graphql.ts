import { ApolloServer } from "apollo-server-micro";
import { makeSchema, objectType, stringArg } from "@nexus/schema";
import * as Schema from "./schema";
import { context } from "./context";

const Post = objectType({
  name: "Post",
  definition(t) {
    t.string("id");
    t.string("date");
    t.string("title");
    t.string("content");
  },
});

const schema = makeSchema({
  types: [Post, Schema.Query, Schema.CreatePost, Schema.RemovePost],
});

const server = new ApolloServer({ schema, context });

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
