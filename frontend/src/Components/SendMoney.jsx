import { useState } from "react";
import { FirstNameComp } from "./FilteredFunction";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading } from "./StylingComp/Heading";
import { InputFields } from "./StylingComp/InputFields";
import axios from "axios";

export default function SendMoney() {
  const [amount, setAmount] = useState(0);
  const { userid, sender } = useLocation().state;
  return (
    <div className="w-screen h-screen bg-gray-300 flex items-center justify-center">
      <div className="  bg-white w-[300px] h-[260px] rounded-xl align-middle">
        <div className="p-2">
          <Heading text={"Send Money"}></Heading>
          <div className="my-5 ml-2">
            <FirstNameComp firstName={sender} />
          </div>

          <div className="mt-7 mb-3">
            <InputFields setvalue={setAmount} heading={"Amount"}></InputFields>
          </div>
          <InitiateTransfer amount={amount} to={userid}></InitiateTransfer>
        </div>
      </div>
    </div>
  );
}

function InitiateTransfer({ amount, to }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={async () => {
        try {
          const resp = await axios.post(
            "http://localhost:3000/api/v1/account/transfer",
            {
              to: to,
              amount: parseInt(amount),
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            }
          );
          console.log(resp);
          navigate("/successful");
        } catch (e) {
          const { message } = e.response.data;
          alert(message);
        }
      }}
      className="text-white font-medium text-center bg-green-500 py-2 rounded-xl w-full cursor-pointer"
    >
      Initiate Transfer
    </div>
  );
}
