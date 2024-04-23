// import Dashboard from "./component/Dashboard/Dashboard";
import Journal from "./component/Journal/Journal";
import { useGetAllDataQuery } from "./services/dataTrade";

function App() {
  const { data, error, isLoading } = useGetAllDataQuery();

  return (
    <div>
      {error ? (
        <div className="text-white">Error</div>
      ) : isLoading ? (
        <div className="text-white">Loading...</div>
      ) : data ? (
        <Journal />
      ) : null}
    </div>
  );
}

export default App;
