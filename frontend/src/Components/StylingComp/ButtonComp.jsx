import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ButtonComp({ text, Name, lastname, email, password }) {
  const navigate = useNavigate();
  return (
    <div className="mx-4 mt-2">
      <button
        onClick={async () => {
          if (text == "Signup") {
            try {
              const resp = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username: email,
                  firstName: Name,
                  lastName: lastname,
                  password: password,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const jwtoken = resp.data.token;
              localStorage.setItem("token", jwtoken);
              navigate("/dashboard", {
                state: {
                  currentUser: Name,
                },
              });
            } catch (e) {
              const { message } = e.response.data;
              alert(message);
            }
          } else if (text == "Sign In") {
            try {
              const resp = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username: email,
                  password: password,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const jwtoken = resp.data.token;
              localStorage.setItem("token", jwtoken);
              navigate("/dashboard", {
                state: {
                  currentUser: email,
                },
              });
            } catch (error) {
              const { message } = e.response.data;
              alert(message);
            }
          }
        }}
        className="text-white font-medium text-center bg-black py-2 rounded-xl w-full cursor-pointer"
      >
        {text}
      </button>
    </div>
  );
}
