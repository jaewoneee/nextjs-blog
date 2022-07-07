import { ApolloServer } from "apollo-server-micro";
import { makeSchema, objectType, stringArg } from "@nexus/schema";

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
    t.list.field("post", {
      type: "Post",
      resolve: (_, args) => {
        return [
          {
            id: 1,
            date: "22.07.07",
            title: "아니근데 솔직히 진짜",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi elit, ornare a nisl nec, lobortis aliquet leo. Nunc tristique velit dictum posuere rhoncus. Vivamus vestibulum purus eget ante rutrum ultrices.",
          },
          {
            id: 2,
            date: "22.07.07",
            title: "아니근데모닉",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi elit, ornare a nisl nec, lobortis aliquet leo. Nunc tristique velit dictum posuere rhoncus. Vivamus vestibulum purus eget ante rutrum ultrices.",
          },
          {
            id: 3,
            date: "22.07.07",
            title: "했다!!!!!!",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi elit, ornare a nisl nec, lobortis aliquet leo. Nunc tristique velit dictum posuere rhoncus. Vivamus vestibulum purus eget ante rutrum ultrices.",
          },
        ];
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Post],
});

const server = new ApolloServer({ schema });

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
