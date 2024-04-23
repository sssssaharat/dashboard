import { BadgeDelta, SparkAreaChart, AreaChart } from "@tremor/react";
import Anlytics from "../Analytics/Analytics";
import { chartdata } from "../Data/chartdata";
import { useGetShowDataQuery } from "../../services/dataTrade";
import { useState, useEffect } from "react";
function Dashboard() {
  const { data, error, isLoading } = useGetShowDataQuery();

  const dataFormatter = (number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

  const [totalPnL, setTotalPnL] = useState(0);
  const TotalPnL = () => {
    let sum = 0;
    data.forEach((item) => {
      sum += parseFloat(item.profitloss.replace("$", "").replace(",", ""));
    });
    setTotalPnL(Number(sum.toFixed(2)));
  };
  useEffect(() => {
    TotalPnL();
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
                  {totalPnL}
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
                  65,300
                </p>
              </div>
              <div className="max-w-full p-6 rounded-xl ring-1 ring-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-white/70 text-sm">Win Rate</h4>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  57.6
                </p>
              </div>
              <div className="max-w-full p-6 rounded-xl ring-1 ring-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-white/70 text-sm">Total Trades</h4>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  92
                </p>
              </div>
            </div>
            <div>
              <AreaChart
                className="py-6 "
                data={chartdata}
                index="date"
                categories={["SemiAnalysis", "The Pragmatic Engineer"]}
                colors={["indigo", "rose"]}
                valueFormatter={dataFormatter}
                yAxisWidth={60}
                onValueChange={(v) => console.log(v)}
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
                  3.2
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
                  5
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
