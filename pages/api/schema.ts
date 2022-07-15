import { objectType, extendType, stringArg, nonNull } from "@nexus/schema";

export type PostTypes = {
  id: string;
  date: string;
  title: string;
  content: string;
};

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.field("posts", {
      type: "Post",
      args: {
        id: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        if (args.id) {
          const currentPost = await ctx.db.posts.filter(
            (v: PostTypes) => v.id === args.id
          );
          return currentPost;
        }
        return ctx.db.posts;
      },
    });
  },
});

export const CreatePost = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: "Post",
      args: {
        date: nonNull(stringArg()),
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) => {
        const draft = {
          id: `${ctx.db.posts.length + 1}`,
          date: args.date,
          title: args.title,
          content: args.content,
        };
        console.log("wef");
        await ctx.db.posts.push(draft);
        return draft;
      },
    });
  },
});

export const RemovePost = extendType({
  type: "Mutation",
  definition(t) {
    t.field("removePost", {
      type: "Post",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_root, { id }, ctx) => {
        const removed = ctx.db.posts.find((v: PostTypes) => v.id === id);
        const newArray = await ctx.db.posts.filter(
          (v: PostTypes) => v.id !== id
        );
        ctx.db.posts = [...newArray];

        return removed;
      },
    });
  },
});
