import { SparkAreaChart, BarChart } from "@tremor/react";
import Anlytics from "../Analytics/Analytics";
import { mockUp } from "../Data/chartdata";
import { useGetShowDataQuery } from "../../services/dataTrade";
import { useState, useEffect } from "react";
function Dashboard() {
  const { data, error, isLoading } = useGetShowDataQuery();
  const [totalPnL, setTotalPnL] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [totalTrade, setTotalTrade] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [trades, setTrades] = useState(null);
  const [rrValues, setRRValues] = useState([]);
  const [maxRR, setMaxRR] = useState(null);
  const [minRR, setMinRR] = useState(null);
  const [breakEven, setBreakEven] = useState(0);
  const [uniqueAssets, setUniqueAssets] = useState(new Set());

  const TotalPnL = () => {
    let sum = 0;
    data?.forEach((item) => {
      sum += parseFloat(item.profitloss.replace("$", "").replace(",", ""));
    });
    setTotalPnL(Number(sum.toFixed(2)));
  };

  const AccountBalance = () => {
    let number = 0;
    data?.forEach((item) => {
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
    data?.forEach(() => {
      count++;
    });
    return count;
  };

  const Winrate = () => {
    let wins = 0;
    let losses = 0;

    data?.forEach((result) => {
      if (result.traderesult === "Win") {
        wins++;
      } else if (result.traderesult === "Loss") {
        losses++;
      }
    });

    const rate = (wins / (wins + losses)) * 100;

    return rate.toFixed(2);
  };
  //   const integers = [];
  //   data.forEach((str) => {
  //     const intValue = Math.round(
  //       // parseInt(str.profitloss.replace("$", "").replace(",", ""))
  //       parseFloat(str.profitloss.replace(/[^\d.-]/g, ""))
  //     );
  //     integers.push(intValue);
  //     console.log(integers);
  //   });

  //   return integers;
  // };
  const convertProfitLossToInt = () => {
    if (data && data.length > 0) {
      const updatedTrades = data?.map((trade) => {
        // ตรวจสอบว่า trade.profitloss เป็นสตริงหรือไม่ก่อนที่จะใช้ replace
        if (typeof trade.profitloss === "string") {
          return {
            ...trade,
            profitloss: parseFloat(trade.profitloss.replace("$", "")),
          };
        } else {
          // หรือหาก trade.profitloss ไม่ใช่สตริง อาจจะต้องดำเนินการอย่างอื่นตามที่เหมาะสม
          return trade;

          // ให้คงค่า trade เดิม
        }
      });
      setTrades(updatedTrades); // อัปเดตตัวแปร trades ด้วยอ็อบเจกต์ที่มีการอัปเดตแล้ว
      // console.log(updatedTrades)
    }
  };
  const calculateRRForEach = (data) => {
    const rrValues = [];

    data?.forEach((item) => {
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

  const breakEvenTrade = () => {
    let sum = 0;
    data?.forEach((item) => {
      sum += parseFloat(item.breakeven.replace("$", "").replace(",", ""));
    });
    setBreakEven(Number(sum.toFixed(2)));
  };
  // const convertBreakEvenToInt = () => {
  //   const updatedTrades = [...be]; // สร้างคัดลอกของ trades เพื่อป้องกันการเปลี่ยนแปลงตรงกับ state ต้นฉบับ
  //   updatedTrades.forEach((trade) => {
  //     trade.breakeven = parseFloat(trade.breakeven.replace("$", "")); // แปลง String เป็น Float และตัดเครื่องหมาย $ ออก
  //   });
  //   setBE(updatedTrades); // อัพเดต state ด้วยข้อมูลใหม่
  // };
  const updateUniqueAssets = (data) => {
    const uniqueAssetSet = new Set();
    // วน loop ในข้อมูลแต่ละรายการเพื่อเพิ่มชื่อ Asset เข้าไปใน Set
    data?.forEach((item) => {
      uniqueAssetSet.add(item.asset);
    });
    // อัปเดต state ด้วยชื่อ Asset ที่ไม่ซ้ำ
    setUniqueAssets(uniqueAssetSet);
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
    breakEvenTrade();
    updateUniqueAssets(data);
    // convertBreakEvenToInt();
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
                <p className="text-xl">Dashboard</p>
                <p className="text-sm">Trading Journal</p>
              </div>
              {[...uniqueAssets].map((asset, index) => (
                <h1 className="font-extrabold" key={index}>
                  {asset}
                </h1>
              ))}
            </div>

            <div className="grid mx-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="max-w-full p-6 rounded-xl ring-1 ring-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-white/70 text-sm">Total PnL</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="gray"
                  >
                    <path d="M12.0049 22.0027C6.48204 22.0027 2.00488 17.5256 2.00488 12.0027C2.00488 6.4799 6.48204 2.00275 12.0049 2.00275C17.5277 2.00275 22.0049 6.4799 22.0049 12.0027C22.0049 17.5256 17.5277 22.0027 12.0049 22.0027ZM8.50488 14.0027V16.0027H11.0049V18.0027H13.0049V16.0027H14.0049C15.3856 16.0027 16.5049 14.8835 16.5049 13.5027C16.5049 12.122 15.3856 11.0027 14.0049 11.0027H10.0049C9.72874 11.0027 9.50488 10.7789 9.50488 10.5027C9.50488 10.2266 9.72874 10.0027 10.0049 10.0027H15.5049V8.00275H13.0049V6.00275H11.0049V8.00275H10.0049C8.62417 8.00275 7.50488 9.12203 7.50488 10.5027C7.50488 11.8835 8.62417 13.0027 10.0049 13.0027H14.0049C14.281 13.0027 14.5049 13.2266 14.5049 13.5027C14.5049 13.7789 14.281 14.0027 14.0049 14.0027H8.50488Z"></path>
                  </svg>
                </div>

                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  $ {totalPnL}
                </p>
              </div>
              <div className="max-w-full p-6 rounded-xl ring-1 ring-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-white/70 text-sm">Account Balance</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="gray"
                  >
                    <path d="M2 20H22V22H2V20ZM4 12H6V19H4V12ZM9 12H11V19H9V12ZM13 12H15V19H13V12ZM18 12H20V19H18V12ZM2 7L12 2L22 7V11H2V7ZM12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8Z"></path>
                  </svg>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  $ {accountBalance}
                </p>
              </div>
              <div className="max-w-full p-6 rounded-xl ring-1 ring-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-white/70 text-sm">Win Rate</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="gray"
                  >
                    <path d="M3 12H7V21H3V12ZM17 8H21V21H17V8ZM10 2H14V21H10V2Z"></path>
                  </svg>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  {winRate} %
                </p>
              </div>
              <div className="max-w-full p-6 rounded-xl ring-1 ring-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-white/70 text-sm">Total Trades</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="gray"
                  >
                    <path d="M5 18L12.6796 12L5 6V4H19V6H8.26348L16 12L8.26348 18H19V20H5V18Z"></path>
                  </svg>
                </div>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  {totalTrade}
                </p>
              </div>
            </div>
            <div className="chartData my-12">
              <BarChart
                className="h-80 w-full"
                data={trades}
                index="date"
                categories={["profitloss"]}
                colors={["slate-50"]}
                yAxisWidth={50}
              />
            </div>
            <div className="grid mx-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-12 py-12">
              <div className="AverageRR rounded-xl ring-1 ring-zinc-800 ">
                <div className="p-3 ">
                  <h4 className="text-white/70">Average RR</h4>

                  <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                    {averageRR}
                  </p>
                </div>
                <SparkAreaChart
                  data={mockUp}
                  categories={["tradeduration"]}
                  index={"date"}
                  colors={["slate-50"]}
                  className="mt-6 w-full"
                />
              </div>
              <div className="MaxRR rounded-xl ring-1 ring-zinc-800">
                <div className="p-3 ">
                  <h4 className="text-white/70">Max RR</h4>

                  <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                    {maxRR}
                  </p>
                </div>
                <SparkAreaChart
                  data={mockUp}
                  categories={["accoutbalance"]}
                  index={"date"}
                  colors={["zinc-500"]}
                  className="mt-6 w-full"
                />
              </div>
              <div className="MinRR rounded-xl ring-1 ring-zinc-800">
                <div className="p-3 ">
                  <h4 className="text-white/70">Min RR</h4>
                  <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                    {minRR}
                  </p>
                </div>
                <SparkAreaChart
                  data={mockUp}
                  categories={["profitloss"]}
                  index={"date"}
                  colors={["zinc-500"]}
                  className="mt-6 w-full"
                />
              </div>
              <div className="BreakEven rounded-xl ring-1 ring-zinc-800">
                <div className="p-3 ">
                  <h4 className="text-white/70">Breakeven Trades</h4>

                  <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                    {breakEven}
                  </p>
                </div>
                <SparkAreaChart
                  data={mockUp}
                  categories={["breakeven"]}
                  index={"date"}
                  colors={["zinc-500"]}
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
