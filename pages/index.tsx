import type { NextPage } from "next";
import Head from "next/head";

type Rate = {
  symbol: string;
  name: string;
  value: number;
};

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Home: NextPage<{ rates: Rate[] }> = ({ rates }) => {
  return (
    <div>
      <Head>
        <title>Crypto Rates</title>
      </Head>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Crypto Rates</h1>
          {rates.map((rate) => (
            <p key={rate.symbol}>
              <strong>{rate.name}</strong>: 1 {rate.symbol} ={" "}
              {formatter.format(rate.value)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const resp: any = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Csolana&vs_currencies=usd"
  );
  const data = await resp.json();
  const rates = [
    { symbol: "BTC", name: "Bitcoin", value: data.bitcoin.usd },
    { symbol: "ETH", name: "Ethereum", value: data.ethereum.usd },
    { symbol: "SOL", name: "Solana", value: data.solana.usd },
  ];
  return {
    props: { rates }, // will be passed to the page component as props
  };
}

export default Home;
