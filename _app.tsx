import "../styles/global.css";
import type { AppProps } from "next/app";
import { Header } from "./components/base/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
