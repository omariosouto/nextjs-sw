import React from "react";

export default function Home() {
  React.useEffect(() => {
    console.log("Hello, world!");
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
        return respostaDoServidor.json();
      })
      .then((respostaCompleta) => {
        console.log(respostaCompleta);
      });
  }, []);

  return <div>Welcome to Next.js!</div>
}