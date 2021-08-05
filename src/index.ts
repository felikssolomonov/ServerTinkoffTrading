import express from "express";
import moment from "moment";
import cors from "cors";
import OpenAPI, { MarketInstrument } from "@tinkoff/invest-openapi-js-sdk";
const apiURL = "https://api-invest.tinkoff.ru/openapi/sandbox"; // Для Production-окружения будет https://api-invest.tinkoff.ru/openapi
const socketURL = "wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws";
const secretToken =
  "t.JfCcepUBRChl9AEbBN1aHQoDJcLhhiuIf9mUZXotknPsCsGTR2W9xKQX8FLcQW-3vhCBsQQJ3ZnLw-R3DnPQqQ"; // токен для сандбокса

const api = new OpenAPI({ apiURL, secretToken, socketURL });

const cors_options = {
  origin: true,
  credentials: true,
};


// !(async function run() {
//   // await api.sandboxClear(); // обнуление портфеля
//   // await api.setCurrenciesBalance({ currency: "USD", balance: 5000 }); // 1000$ на счет
//   // await api.setCurrenciesBalance({ currency: "EUR", balance: 1000 }); // 1000€ на счет
//   // await api.setCurrenciesBalance({ currency: "RUB", balance: 1000 }); // 1000₽ на счет
//   // const currency = await api.portfolioCurrencies(); // Сумма на счету
//   // console.log("Сумма на счету", currency);
//   // const portfolio = await api.portfolio(); // Портфель
//   // console.log("Портфелеь", portfolio);
//   //@ts-ignore
//   // const { figi } = await api.searchOne({ ticker: "CVX" }); // Поиск эмитента
//   //   const myTickerInfo = await api.instrumentPortfolio({ figi }); // Информация по эмитенту в портфеле
//   //   console.log("Информация по эмитенту в портфеле", myTickerInfo);
//   //   const marketInstrument = (await api.searchOne({
//   //     figi,
//   //   })) as MarketInstrument; // Информация по эмитенту
//   //   console.log("Эмитент", marketInstrument);
//     // const glass = await api.orderbookGet({ figi, depth: 10 }); // получаем стакан по AAPL
//     // console.log("Стакан", glass);
//   //   const from = new Date(Date.now() - 20 * 60 * 1000);
//   //   const to = new Date(Date.now().toLocaleString(""));
//   //   console.log("from", from);
//   //   console.log("to", to);
//   //   const from = moment().subtract(20, "minutes").format();
//   //   const to = moment().format();
//   //   const candles = await api.candlesGet({
//   //     from: from,
//   //     to: to,
//   //     figi,
//   //     interval: "5min",
//   //   }); // Получаем свечи за конкретный промежуток времени по AAPL
//   //   console.log("Свечи", candles);
//   //   // Подписка на стакан
//   //   api.orderbook({ figi, depth: 3 }, (x) => {
//   //     console.clear();
//   //     // console.log("заявки на продажу", x.asks);
//   //     x.asks.reverse().map((item) => {
//   //       let word = "";
//   //       if (item[0] % 1 === 0) {
//   //         word = ".00";
//   //       } else if (item[0] % 1 > 0 && (item[0] * 10) % 1 === 0) {
//   //         word = "0";
//   //       }
//   //       console.log("\t" + item[0] + word + " $\t" + item[1]);
//   //     });
//   //     // console.log("заявки на покупку", x.bids);
//   //     x.bids.map((item) => {
//   //       let word = "";
//   //       if (item[0] % 1 === 0) {
//   //         word = ".00";
//   //       } else if (item[0] % 1 > 0 && (item[0] * 10) % 1 === 0) {
//   //         word = "0";
//   //       }
//   //       console.log(item[1] + "\t" + item[0] + word + " $");
//   //     });
//   //   });
//   //   // Информация о последней свече
//   //   api.candle({ figi, interval: "1min" }, (x) => {
//   //     console.clear();
//   //     console.log(x);
//   //   });
//     // const buy = await api.limitOrder({
//     //   operation: "Buy",
//     //   figi,
//     //   lots: 2,
//     //   price: 100,
//     // }); // Покупаем AAPL
//   //   const sell = await api.limitOrder({
//   //     operation: "Sell",
//   //     figi,
//   //     lots: 1,
//   //     price: 105,
//   //   }); // Продаем AAPL
// })();

const app = express();
const port = 3001;

app.use(cors(cors_options));

app.get("/", async (req, res) => {
  const currency = await api.portfolioCurrencies();
  res
    .status(200)
    .json({ currency });
});

app.get("/portfolio", async (req, res) => {
  const portfolio = await api.portfolio();
  res
    .status(200)
    .json({ portfolio });
});

app
  .listen(port, () => {
    return console.log(`server is listening on ${port}`);
  })
  .on("error", (err) => console.error(err));
