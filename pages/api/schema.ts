import { objectType, extendType, stringArg, nonNull } from "@nexus/schema";

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: "Post",
      args: {
        date: nonNull(stringArg()),
        title: nonNull(stringArg()), // 2
        content: nonNull(stringArg()), // 2
      },
      resolve: async (_root, args, ctx) => {
        const draft = {
          id: `${ctx.db.posts.length + 1}`,
          date: args.date,
          title: args.title, // 3
          content: args.content, // 3
        };
        await ctx.db.posts.push(draft);
        console.log(ctx.db.posts);
        return draft;
      },
    });
  },
});
