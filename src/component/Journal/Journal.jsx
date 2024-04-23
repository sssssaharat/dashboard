import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useGetShowDataQuery } from "../../services/dataTrade";
import Dashboard from "../Dashboard/Dashboard";
function Journal() {
  const { data, error, isLoading } = useGetShowDataQuery();
  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div className="mx-auto max-w-7xl py-12">
          <div className="mx-6 rounded-xl ring-1 ring-zinc-700 p-6">
            <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              List of Data Trade
            </h3>
            <Table className="mt-5 rounded-xl ring-1 ring-zinc-700">
              <TableHead className="border border-zinc-700 ">
                <TableRow>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Accout Balance</TableHeaderCell>
                  <TableHeaderCell>Asset</TableHeaderCell>
                  <TableHeaderCell>Position</TableHeaderCell>
                  <TableHeaderCell>Entry</TableHeaderCell>
                  <TableHeaderCell>Stop Loss</TableHeaderCell>
                  <TableHeaderCell>Take Profit</TableHeaderCell>
                  <TableHeaderCell>Session</TableHeaderCell>
                  <TableHeaderCell>Trade Result</TableHeaderCell>
                  <TableHeaderCell>Profit/Loss</TableHeaderCell>
                  <TableHeaderCell>Trade Duration</TableHeaderCell>
                  <TableHeaderCell>Break Even</TableHeaderCell>
                  <TableHeaderCell>Total Balance</TableHeaderCell>
                  <TableHeaderCell>Img</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id} className="text-white/70">
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.accoutbalance} </TableCell>
                    <TableCell>{item.asset}</TableCell>
                    <TableCell>{item.position}</TableCell>
                    <TableCell>{item.entry}</TableCell>
                    <TableCell>{item.stoploss}</TableCell>
                    <TableCell>{item.takeprofit}</TableCell>
                    <TableCell>{item.session}</TableCell>
                    <TableCell>{item.traderesult}</TableCell>
                    <TableCell>{item.profitloss} </TableCell>
                    <TableCell>{item.tradeduration}</TableCell>
                    <TableCell>{item.breakeven}</TableCell>
                    <TableCell>{item.totalbalance} </TableCell>
                    <TableCell>
                      <a href={item.img}>{item.img}</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Dashboard />
        </div>
      ) : null}
    </div>
  );
}

export default Journal;
