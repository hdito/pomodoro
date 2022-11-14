import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/features/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pomodoro timer</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
