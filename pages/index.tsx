import React from "react";

export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    console.log("Hello, world!");

    setLoading(true);
    fetch("/api/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-SW-Cache": "true",
        "X-SW-Expires": "60",
        "X-SW-Retry": "1",
      },
    })
      .then((respostaDoServidor) => {
        setLoading(false);
        return respostaDoServidor.json();
      })
      .then((respostaCompleta) => {
        console.log(respostaCompleta);
        setData(respostaCompleta);
      });
  }, []);

  return (
    <div>
      Welcome to Next.js!
      <p>
        {loading && "Loading..."}
      </p>
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
    </div>
  )
}