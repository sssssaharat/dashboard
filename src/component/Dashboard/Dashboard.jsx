import { BadgeDelta, Card } from "@tremor/react";
import { AreaChart } from "@tremor/react";

function Dashboard() {
  const chartdata = [
    {
      date: "Jan 22",
      SemiAnalysis: 2890,
      "The Pragmatic Engineer": 2338,
    },
    {
      date: "Feb 22",
      SemiAnalysis: 2756,
      "The Pragmatic Engineer": 2103,
    },
    {
      date: "Mar 22",
      SemiAnalysis: 3322,
      "The Pragmatic Engineer": 2194,
    },
    {
      date: "Apr 22",
      SemiAnalysis: 3470,
      "The Pragmatic Engineer": 2108,
    },
    {
      date: "May 22",
      SemiAnalysis: 3475,
      "The Pragmatic Engineer": 1812,
    },
    {
      date: "Jun 22",
      SemiAnalysis: 3129,
      "The Pragmatic Engineer": 1726,
    },
    {
      date: "Jul 22",
      SemiAnalysis: 3490,
      "The Pragmatic Engineer": 1982,
    },
    {
      date: "Aug 22",
      SemiAnalysis: 2903,
      "The Pragmatic Engineer": 2012,
    },
    {
      date: "Sep 22",
      SemiAnalysis: 2643,
      "The Pragmatic Engineer": 2342,
    },
    {
      date: "Oct 22",
      SemiAnalysis: 2837,
      "The Pragmatic Engineer": 2473,
    },
    {
      date: "Nov 22",
      SemiAnalysis: 2954,
      "The Pragmatic Engineer": 3848,
    },
    {
      date: "Dec 22",
      SemiAnalysis: 3239,
      "The Pragmatic Engineer": 3736,
    },
  ];
  const dataFormatter = (number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;
  return (
    <div className="mx-auto max-w-7xl py-12">
      <div className="mx-6 py-6 rounded-xl ring-1 ring-gray-500/50">
        <div className="flex justify-between p-6 text-gray-400">
          <div className="flex-initial w-64">
            <p className="text-xl">Profit and Losses</p>
            <p className="text-sm">Over time</p>
          </div>
          <div className="flex-initial w-64">
            <p>XAUUSD</p>
          </div>
          <div className="flex-none w-14 "></div>
        </div>
        <div className="grid mx-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="mx-auto max-w-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Total PnL
              </h4>
              <BadgeDelta
                deltaType="moderateIncrease"
                isIncreasePositive={true}
                size="xs"
              >
                +9.3%
              </BadgeDelta>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              23,456
            </p>
          </Card>
          <Card className="mx-auto max-w-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Account Balance
              </h4>
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
          </Card>
          <Card className="mx-auto max-w-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Win Rate
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              57.6
            </p>
          </Card>
          <Card className="mx-auto max-w-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Total Trades
              </h4>
            </div>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              92
            </p>
          </Card>
        </div>
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
    </div>
  );
}

export default Dashboard;
