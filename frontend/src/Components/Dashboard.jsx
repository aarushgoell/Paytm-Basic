import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FilteredFunction } from "./FilteredFunction";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const { currentUser } = useLocation().state;

  console.log(currentUser);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        setBalance(resp.data.balance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className=" w-[700px] h-[500px]">
        <div className="flex justify-between  h-10 items-center shadow-lg p-3 bg-white rounded-lg">
          <div className="font-bold">Payments App</div>
          <div className="flex justify-between w-[130px] mr-3  h-7">
            <div className="font-bold">Hello,User</div>
            <div className="bg-gray-200 rounded-2xl w-8 flex items-center justify-center mr-0.5">
              <div className="font-bold">{currentUser[0].toUpperCase()}</div>
            </div>
          </div>
        </div>
        <div className="flex w-[150px] justify-between mt-12">
          <div className="font-bold">Your balance:</div>
          <div className="font-medium">${balance}</div>
        </div>

        <div className="font-bold mt-6">Users</div>

        <FilteredFunction></FilteredFunction>
      </div>
    </div>
  );
}
