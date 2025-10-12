import { passwordValidator } from "../util";
import Checked from "../../../../public/icon/checked.svg";
import Prohibition from "../../../../public/icon/prohibition.svg";

const PasswordValidationMessage = ({ password }: { password: string }) => {
  const minLengthCondition = passwordValidator.minLength(password);
  const hasLetterCondition = passwordValidator.hasLetter(password);
  const hasNumberCondition = passwordValidator.hasNumber(password);

  const conditions = [
    {
      condition: minLengthCondition,
      message: "최소 8자 이상",
    },
    {
      condition: hasLetterCondition,
      message: "최소 1개 이상의 영문자 포함",
    },
    {
      condition: hasNumberCondition,
      message: "최소 1개 이상의 숫자 포함",
    },
  ];

  return (
    <div className="flex flex-col px-[15px] py-[18px] gap-2 bg-sub border border-[#E1E1E1] rounded-[11px] mt-1">
      {conditions.map((condition) => (
        <div key={condition.message} className="flex items-center gap-1.5">
          {condition.condition ? <Checked /> : <Prohibition />}
          <span className="text-[11px]">{condition.message}</span>
        </div>
      ))}
    </div>
  );
};

export default PasswordValidationMessage;
