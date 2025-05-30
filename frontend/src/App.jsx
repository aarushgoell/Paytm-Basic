import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Signup = lazy(() => import("./Components/Signup"));
const Signin = lazy(() => import("./Components/Signin"));
const SendMoney = lazy(() => import("./Components/SendMoney"));
const Dashboard = lazy(() => import("./Components/Dashboard"));
const Successful = lazy(() => import("./Components/Successful"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/sendmoney" element={<SendMoney />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/successful" element={<Successful />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
