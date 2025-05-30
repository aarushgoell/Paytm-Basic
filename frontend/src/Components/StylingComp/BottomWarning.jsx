import { useNavigate } from "react-router-dom";

export function ButtomWarning({ text, verify }) {
  const navigate = useNavigate();
  return (
    <div className=" display flex justify-center mt-4">
      <div>{text}</div>

      <div
        onClick={() => {
          if (verify == "Sign up") {
            navigate("/signup");
          } else {
            navigate("/signin");
          }
        }}
        className="underline underline-offset-1 ml-2 cursor-pointer"
      >
        {verify}
      </div>
    </div>
  );
}
