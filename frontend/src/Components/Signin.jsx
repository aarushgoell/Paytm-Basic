import { useState } from "react";
import { ButtomWarning } from "./StylingComp/BottomWarning";
import { ButtonComp } from "./StylingComp/ButtonComp";
import { Heading } from "./StylingComp/Heading";
import { InputFields } from "./StylingComp/InputFields";
import { SubHeading } from "./StylingComp/SubHeading";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-screen h-screen bg-gray-300 flex items-center justify-center">
      <div className="  bg-white w-[300px] h-[370px] rounded-xl align-middle">
        <div className="p-2">
          <Heading text={"Sign In"}></Heading>
          <SubHeading
            text={"Enter your credentials to access your account"}
          ></SubHeading>
          <InputFields heading={"Email"} setvalue={setEmail}></InputFields>
          <InputFields
            heading={"Password"}
            setvalue={setPassword}
          ></InputFields>

          <ButtonComp
            text={"Sign In"}
            email={email}
            password={password}
          ></ButtonComp>
          <ButtomWarning
            text={"Don't have an account"}
            verify={"Sign up"}
          ></ButtomWarning>
        </div>
      </div>
    </div>
  );
}
