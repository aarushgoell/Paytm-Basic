export function InputFields({ heading, setvalue }) {
  return (
    <div className="text-[16px] font-medium  px-2 py-1 rounded-xl">
      <div className="my-1">{heading}</div>
      <input
        onInput={(e) => {
          setvalue(e.target.value);
        }}
        className="border-gray-200 w-full py-0.5 pl-1 border rounded focus:outline-none my-0.5"
        type={heading == "Password" ? "password" : "text"}
        placeholder={`Enter ${heading}`}
      ></input>
    </div>
  );
}
