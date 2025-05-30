import { useState } from "react";
import { ButtomWarning } from "./StylingComp/BottomWarning";
import { ButtonComp } from "./StylingComp/ButtonComp";
import { Heading } from "./StylingComp/Heading";
import { InputFields } from "./StylingComp/InputFields";
import { SubHeading } from "./StylingComp/SubHeading";

export default function Signup() {
  const [Name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-screen h-screen bg-gray-300 flex items-center justify-center">
      {console.log("r1")}
      <div className="  bg-white w-[300px] h-[500px] rounded-xl align-middle">
        <div className="p-2">
          <Heading text={"Sign up"}></Heading>
          <SubHeading
            text={"Enter your information to create an account"}
          ></SubHeading>
          <InputFields setvalue={setName} heading={"First Name"}></InputFields>
          <InputFields
            setvalue={setLastName}
            heading={"Last Name"}
          ></InputFields>
          <InputFields setvalue={setEmail} heading={"Email"}></InputFields>
          <InputFields
            setvalue={setPassword}
            heading={"Password"}
          ></InputFields>
          {console.log("r1")}
          <ButtonComp
            Name={Name}
            lastname={lastname}
            email={email}
            password={password}
            text={"Signup"}
          ></ButtonComp>
          <ButtomWarning
            text={"Already have an account?"}
            verify={"Sign in"}
          ></ButtomWarning>
          {console.log("r1")}
        </div>
      </div>
    </div>
  );
}
