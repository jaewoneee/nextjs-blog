import { PostTypes } from "./schema";

export interface DB {
  posts: PostTypes[];
}

export const db: DB = {
  posts: [
    {
      id: "1",
      date: "22.07.07",
      title: "아니근데 솔직히 진짜",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi elit, ornare a nisl nec, lobortis aliquet leo. Nunc tristique velit dictum posuere rhoncus. Vivamus vestibulum purus eget ante rutrum ultrices.",
    },
    {
      id: "2",
      date: "22.07.07",
      title: "오ㅐ .. 안 돼?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi elit, ornare a nisl nec, lobortis aliquet leo. Nunc tristique velit dictum posuere rhoncus. Vivamus vestibulum purus eget ante rutrum ultrices.",
    },
  ],
};
