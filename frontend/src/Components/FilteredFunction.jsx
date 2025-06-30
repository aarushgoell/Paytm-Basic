import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function FilteredFunction() {
  const [filter, setFilter] = useState("");

  return (
    <div>
      <input
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        className="border border-gray-400 focus:outline-none w-full p-1 mt-5 rounded-l"
        type="text"
        placeholder="Search users..."
      ></input>
      <AllUsers filter={filter}></AllUsers>
    </div>
  );
}

function AllUsers({ filter }) {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bulk?filter=${filter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((resp) => {
        setUsers(resp.data.users);
      });
  }, [filter]);
  return (
    <div>
      <RenderUsers users={users}></RenderUsers>
    </div>
  );
}

function RenderUsers({ users }) {
  const navigate = useNavigate();
  return (
    <div className=" mt-5 h-[150px]">
      {users?.map((usr, key) => {
        const { firstName, _id } = usr;
        return (
          <div className="flex justify-between mt-5" key={key}>
            <FirstNameComp firstName={firstName}></FirstNameComp>
            <div
              onClick={() => {
                navigate("/sendmoney", {
                  state: {
                    userid: _id,
                    sender: firstName,
                  },
                });
              }}
              className="text-white bg-black px-4 py-1 rounded-xl cursor-pointer"
            >
              Send Money
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FirstNameComp({ firstName }) {
  return (
    <div className="flex w-25 justify-between">
      <div className="bg-gray-200 rounded-2xl w-8 flex items-center justify-center mr-0.5">
        <div className="font-semibold"> {firstName[0]} </div>
      </div>

      <div className="flex justify-start w-13">
        <div className="font-bold text-l">{firstName}</div>
      </div>
    </div>
  );
}
