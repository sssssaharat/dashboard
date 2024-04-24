import { ListItem } from "@tremor/react";
import { useGetTableDataQuery } from "../../services/dataTrade";
import { useState, useEffect } from "react";
function Analytics() {
  const { data, error, isLoading } = useGetTableDataQuery();
  const [rr, setRR] = useState([]);
  const [averageTradeDuration, setAverageTradeDuration] =
    useState("0 hours 0 minutes");
  const [totalTrade, setTotalTrade] = useState(0);
  const [winsCount, setWinsCount] = useState(0);
  const [averageWinDuration, setAverageWinDuration] =
    useState("0 hours 0 minutes");
  const [winningRate, setWinningRate] = useState(0);

  //Average
  const CalRR = (data) => {
    const rr = [];

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
        rr.push(Math.abs(takeProfit - entry) / Math.abs(stopLoss - entry));
      }
    });

    return rr;
  };
  const calculateAverageRR = (rr) => {
    const filteredRRValues = rr.filter((value) => value !== null);
    if (filteredRRValues.length > 0) {
      const sum = filteredRRValues.reduce((acc, curr) => acc + curr, 0);
      return Math.abs(sum / filteredRRValues.length).toFixed(2);
    } else {
      return null;
    }
  };
  const averageRR = calculateAverageRR(rr);
  //durations
  const calculateAverage = (numbers) => {
    if (numbers.length === 0) {
      return "0 hours 0 minutes";
    }

    const totalMinutes = numbers.reduce((acc, cur) => {
      const duration = parseInt(cur.tradeduration);
      return isNaN(duration) ? acc : acc + duration;
    }, 0);
    const hours = Math.floor(totalMinutes / numbers.length / 60).toFixed(0);
    const minutes = ((totalMinutes / numbers.length) % 60).toFixed(0);
    return `${hours} hours ${minutes} minutes`;
  };
  //Total Trades
  const TotalTrade = () => {
    let count = 0;
    data.forEach(() => {
      count++;
    });
    return count;
  };
  //TotalWinners
  const updateWinsCount = () => {
    let count = 0;
    data.map((result) => {
      if (result.traderesult === "Win") {
        count++;
      }
    });
    setWinsCount(count);
  };
  //AverageWinDuration
  const calculateAverageWinDuration = () => {
    const winTrades = data.filter((trade) => trade.traderesult === "Win");
    const durations = winTrades.map((trade) => parseInt(trade.tradeduration));

    if (durations.length > 0) {
      const totalDuration = durations.reduce((acc, cur) => acc + cur, 0);
      const averageDurationInMinutes = totalDuration / durations.length;
      const hours = Math.floor(averageDurationInMinutes / 60);
      const minutes = Math.round(averageDurationInMinutes % 60);
      setAverageWinDuration(`${hours}  hours  ${minutes} minutes`);
    } else {
      setAverageWinDuration(0);
    }
  };
  ///Average Win
  const calculateWinningRate = () => {
    // หาจำนวนครั้งที่มีการชนะ
    const winCount = data.filter(
      (trade) => trade.traderesult === "Win"
    ).length;
    // หาจำนวนรวมของการเทรดทั้งหมด
    const totalTrades = data.length;
    // คำนวณค่าเฉลี่ยของการชนะในรูปแบบเปอร์เซ็นต์
    const rate = (winCount / totalTrades) * 100;
    return rate.toFixed(2);
  };

  useEffect(() => {
    const calculatedRRValues = CalRR(data);
    setRR(calculatedRRValues);
    ////////averageDuration
    const averageDuration = calculateAverage(data);
    setAverageTradeDuration(averageDuration);
    ////////TotalTrade
    setTotalTrade(TotalTrade());
    ////////TotalWinners
    updateWinsCount(data);
    ////////AverageWinDuration
    calculateAverageWinDuration(data);
    ////////Average Win
    const rate = calculateWinningRate(data);
    setWinningRate(rate);
  }, [data]);
  return (
    <div>
      {error ? (
        <div className="text-white">Error</div>
      ) : isLoading ? (
        <div className="text-white">Loading...</div>
      ) : data ? (
        <div className="mx-auto max-w-7xl py-12">
          <div className="mx-6 py-6 rounded-xl ring-1 ring-zinc-700">
            <div className="mx-6 ">
              <h1 className="text-gray-200 font-bold ">Advanced Analytics</h1>
              <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3 text-center ">
                <div className="rounded-xl ring-1 ring-zinc-700 p-4 ">
                  <p className="text-white font-bold ">summary</p>
                  <div className="text-white/70 mt-3  ">
                    <ListItem>
                      <span>Average RR </span>
                      <span>{averageRR}</span>
                    </ListItem>
                    <ListItem>
                      <span>Average Duration</span>
                      <span>{averageTradeDuration}</span>
                    </ListItem>
                    <ListItem>
                      <span>Total Trades</span>
                      <span>{totalTrade}</span>
                    </ListItem>
                  </div>
                </div>
                <div className="rounded-xl ring-1 ring-zinc-700 p-4">
                  <p className="text-white font-bold ">Winning Trades</p>
                  <div className="text-white/70 mt-3 ">
                    <ListItem>
                      <span>Total Winners </span>
                      <span>{winsCount}</span>
                    </ListItem>
                    <ListItem>
                      <span>Average Duration</span>
                      <span>{averageWinDuration}</span>
                    </ListItem>
                    <ListItem>
                      <span>Average Win</span>
                      <span>{winningRate} %</span>
                    </ListItem>
                  </div>
                </div>
                <div className="rounded-xl ring-1 ring-zinc-700 p-4">
                  <p className="text-white font-bold ">Losing Trades</p>
                  <div className="text-white/70 mt-3 ">
                    <ListItem>
                      <span>Total Losers </span>
                      <span>70</span>
                    </ListItem>
                    <ListItem>
                      <span>Average Duration</span>
                      <span>8h 5m</span>
                    </ListItem>
                    <ListItem>
                      <span>Average Win</span>
                      <span>0.88%</span>
                    </ListItem>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Analytics;
