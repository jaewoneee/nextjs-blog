import { ApolloServer } from "apollo-server-micro";
import { makeSchema, objectType, stringArg } from "@nexus/schema";
import { PostMutation } from "./schema";
import { context } from "./context";
import { join } from "path";

const Post = objectType({
  name: "Post",
  definition(t) {
    t.string("id");
    t.string("date");
    t.string("title");
    t.string("content");
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.field("posts", {
      type: "Post",
      resolve: (_, args, ctx) => {
        return ctx.db.posts;
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Post, PostMutation],
});

const server = new ApolloServer({ schema, context });

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
