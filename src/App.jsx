import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";

function App() {
  const token = localStorage.getItem("token");

  return token ? <Dashboard /> : <Login />;
}

export default App;