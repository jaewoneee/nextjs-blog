import Link from "next/link";
import { useMemo } from "react";
import styles from "./Card.module.css";

export default function CardLink() {
  const cardData = useMemo(
    () => [
      {
        path: "/post",
        title: "Go to Post List",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi
  elit, ornare a nisl nec, lobortis aliquet leo. Nunc tristique velit
  dictum posuere rhoncus. Vivamus vestibulum purus eget ante rutrum
  ultrices.`,
      },
      {
        path: "/post/add",
        title: "Add Post",
        text: `Nullam ullamcorper metus enim, vitae vulputate tellus tristique
        malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam vehicula libero eget tellus tempus ullamcorper. Maecenas
        tempus metus eleifend est rutrum, non interdum ipsum molestie.
        Curabitur dapibus nisi ligula, sed cursus risus ullamcorper eu. Duis
        convallis leo ac malesuada pretium.`,
      },
    ],
    []
  );

  return (
    <>
      {cardData.map((v, i) => (
        <div className={styles.card} key={`card${i + 1}`}>
          <Link href={v.path}>
            <a>
              {v.title} <span>&rarr;</span>
            </a>
          </Link>
          <p>{v.text}</p>
        </div>
      ))}
    </>
  );
}
