import { ListItem } from "@tremor/react";
function Analytics() {
  return (
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
                  <span>3.2</span>
                </ListItem>
                <ListItem>
                  <span>Average Duration</span>
                  <span>8h 5m</span>
                </ListItem>
                <ListItem>
                  <span>Total Trades</span>
                  <span>92</span>
                </ListItem>
              </div>
            </div>
            <div className="rounded-xl ring-1 ring-zinc-700 p-4">
              <p className="text-white font-bold ">Winning Trades</p>
              <div className="text-white/70 mt-3 ">
                <ListItem>
                  <span>Total Winners </span>
                  <span>3.2</span>
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
  );
}

export default Analytics;
