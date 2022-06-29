import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.card}>
          <Link href="/post">
            <a>
              Go to Post List <span>&rarr;</span>
            </a>
          </Link>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi
            elit, ornare a nisl nec, lobortis aliquet leo. Nunc tristique velit
            dictum posuere rhoncus. Vivamus vestibulum purus eget ante rutrum
            ultrices.
          </p>
        </div>
        <div className={styles.card}>
          <Link href="/post/add">
            <a>
              Add Post <span>&rarr;</span>
            </a>
          </Link>
          <p>
            Nullam ullamcorper metus enim, vitae vulputate tellus tristique
            malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam vehicula libero eget tellus tempus ullamcorper. Maecenas
            tempus metus eleifend est rutrum, non interdum ipsum molestie.
            Curabitur dapibus nisi ligula, sed cursus risus ullamcorper eu. Duis
            convallis leo ac malesuada pretium.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
