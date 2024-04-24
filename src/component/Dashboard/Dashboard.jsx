import { BadgeDelta, SparkAreaChart, AreaChart } from "@tremor/react";
import Anlytics from "../Analytics/Analytics";
import { chartdata, mockUp } from "../Data/chartdata";
import { useGetShowDataQuery } from "../../services/dataTrade";
import { useState, useEffect } from "react";
function Dashboard() {
  const { data, error, isLoading } = useGetShowDataQuery();
  const [totalPnL, setTotalPnL] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [totalTrade, setTotalTrade] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [trades, setTrades] = useState(mockUp);
  const [rrValues, setRRValues] = useState([]);
  const [maxRR, setMaxRR] = useState(null);
  const [minRR, setMinRR] = useState(null);

  const dataFormatter = (number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

  const TotalPnL = () => {
    let sum = 0;
    data.forEach((item) => {
      sum += parseFloat(item.profitloss.replace("$", "").replace(",", ""));
    });
    setTotalPnL(Number(sum.toFixed(2)));
  };

  const AccountBalance = () => {
    let number = 0;
    data.forEach((item) => {
      const parsedNumber = parseFloat(
        item.totalbalance.replace("$", "").replace(",", "")
      );
      if (!isNaN(parsedNumber)) {
        number = parsedNumber;

        return;
      }
    });
    return number;
  };

  const TotalTrade = () => {
    let count = 0;
    data.forEach(() => {
      count++;
    });
    return count;
  };

  const Winrate = () => {
    let wins = 0;
    let losses = 0;

    data.forEach((result) => {
      if (result.traderesult === "Win") {
        wins++;
      } else if (result.traderesult === "Loss") {
        losses++;
      }
    });

    const rate = (wins / (wins + losses)) * 100;

    return rate.toFixed(2);
  };
  const convertProfitLossToInt = () => {
    const updatedTrades = [...trades]; // สร้างคัดลอกของ trades เพื่อป้องกันการเปลี่ยนแปลงตรงกับ state ต้นฉบับ
    updatedTrades.forEach((trade) => {
      trade.profitloss = parseFloat(trade.profitloss.replace("$", "")); // แปลง String เป็น Float และตัดเครื่องหมาย $ ออก
    });
    setTrades(updatedTrades); // อัพเดต state ด้วยข้อมูลใหม่
  };
  const calculateRRForEach = (data) => {
    const rrValues = [];

    data.forEach((item) => {
      const takeProfit = parseFloat(item.takeprofit.replace(/[^\d.-]/g, ""));
      const stopLoss = parseFloat(item.stoploss.replace(/[^\d.-]/g, ""));
      const entry = parseFloat(item.entry.replace(/[^\d.-]/g, ""));

      if (
        !isNaN(takeProfit) &&
        !isNaN(stopLoss) &&
        stopLoss !== 0 &&
        entry !== 0
      ) {
        rrValues.push(
          Math.abs(takeProfit - entry) / Math.abs(stopLoss - entry)
        );
      }
    });

    return rrValues;
  };
  const calculateAverageRR = (rrValues) => {
    const filteredRRValues = rrValues.filter((value) => value !== null);
    if (filteredRRValues.length > 0) {
      const sum = filteredRRValues.reduce((acc, curr) => acc + curr, 0);
      return Math.abs(sum / filteredRRValues.length).toFixed(2);
    } else {
      return null;
    }
  };
  const averageRR = calculateAverageRR(rrValues);

  const calculateMaxRRValue = (data) => {
    const rrValues = calculateRRForEach(data);
    if (rrValues.length > 0) {
      return Math.max(...rrValues).toFixed(2);
    }
    return null;
  };
  const calculateMinRRValue = (data) => {
    const rrValues = calculateRRForEach(data);
    if (rrValues.length > 0) {
      return Math.min(...rrValues).toFixed(2);
    }
    return null;
  };
  useEffect(() => {
    TotalPnL();
    setAccountBalance(AccountBalance());
    setTotalTrade(TotalTrade());
    setWinRate(Winrate());
    convertProfitLossToInt();
    const calculatedRRValues = calculateRRForEach(data);
    setRRValues(calculatedRRValues);
    const maxRRValue = calculateMaxRRValue(data);
    setMaxRR(maxRRValue);
    const minRRValue = calculateMinRRValue(data);
    setMinRR(minRRValue);
  }, [data]);

  return (
    <div className="App">
      {error ? (
        <div className="text-white">Error</div>
      ) : isLoading ? (
        <div className="text-white">Loading...</div>
      ) : data ? (
        <div className="mx-auto max-w-7xl py-12">
          <div className="mx-6 py-6 rounded-xl ring-1 ring-zinc-700">
            <div className="flex justify-between p-6 text-white">
              <div className="flex-initial w-64">
                <p className="text-xl">Profit and Losses</p>
                <p className="text-sm">Over time</p>
              </div>
              <h1 className="text-white">{data.asset}</h1>
              <div className="flex-none w-14 "></div>
            </div>

            <div className="grid mx-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="max-w-full p-6 rounded-xl ring-1 ring-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-white/70 text-sm">Total PnL</h4>
                  <BadgeDelta
                    deltaType="moderateIncrease"
                    isIncreasePositive={true}
                    size="xs"
                  >
                    +9.3%
                  </BadgeDelta>
                </div>

                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  {totalPnL} $
                </p>
              </div>

              <div className="max-w-full p-6 rounded-xl ring-1 ring-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-white/70 text-sm">Account Balance</h4>
                  <BadgeDelta
                    deltaType="moderateIncrease"
                    isIncreasePositive={true}
                    size="xs"
                  >
                    +12.3%
                  </BadgeDelta>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  {accountBalance} $
                </p>
              </div>
              <div className="max-w-full p-6 rounded-xl ring-1 ring-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-white/70 text-sm">Win Rate</h4>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  {winRate} %
                </p>
              </div>
              <div className="max-w-full p-6 rounded-xl ring-1 ring-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-white/70 text-sm">Total Trades</h4>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  {totalTrade}
                </p>
              </div>
            </div>
            <div>
              <AreaChart
                className="py-6 "
                data={trades}
                index="date"
                categories={["profitloss"]}
                colors={["indigo"]}
                valueFormatter={dataFormatter}
                yAxisWidth={60}
              />
            </div>
            <div className="grid mx-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    Average RR
                  </h4>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  {averageRR}
                </p>
                <SparkAreaChart
                  data={chartdata}
                  categories={["SemiAnalysis"]}
                  index={"date"}
                  colors={["emerald"]}
                  className="mt-6 w-full"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    Max RR
                  </h4>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  {maxRR}
                </p>

                <SparkAreaChart
                  data={chartdata}
                  categories={["The Pragmatic Engineer"]}
                  index={"date"}
                  colors={["emerald"]}
                  className="mt-6 w-full"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    Min RR
                  </h4>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  {minRR}
                </p>

                <SparkAreaChart
                  data={chartdata}
                  categories={["The Pragmatic Engineer"]}
                  index={"date"}
                  colors={["emerald"]}
                  className="mt-6 w-full"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    Breakeven Trades
                  </h4>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  7
                </p>
                <SparkAreaChart
                  data={chartdata}
                  categories={["SemiAnalysis"]}
                  index={"date"}
                  colors={["red"]}
                  className="mt-6 w-full"
                />
              </div>
            </div>
          </div>

          <Anlytics />
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
