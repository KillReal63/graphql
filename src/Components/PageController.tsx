import React, { KeyboardEvent, useState } from "react";
import Back from "../Assets/Icons/Back";
import Forward from "../Assets/Icons/Forward";

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PageController: React.FC<Props> = ({ page, setPage, userTable }) => {
  const [inputValue, setInputValue] = useState(1);

  const switchPage = (variant: string) => {
    switch (variant) {
      case "next":
        setPage((prevValue) => prevValue + 1);
        setInputValue((prevValue) => prevValue + 1);
        break;
      case "previous":
        if (page - 1 >= 1) {
          setPage((prevValue) => prevValue - 1);
          setInputValue((prevValue) => prevValue - 1);
        }
        break;
      case "first":
        setPage(1);
        setInputValue(1);
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (event: KeyboardEvent): void => {
    const target = event.target as HTMLInputElement;

    if (event.key === "Enter" && target.value !== undefined) {
      setPage(Number(target.value));
    }

    if (target.value === "0") {
      switchPage("first");
    }
  };


  if (!userTable) return <div>lox</div>

  console.log(userTable);
  

  return (
    <div className="flex w-full justify-center items-center mb-8">
      <button onClick={() => switchPage("previous")}>
        <Back />
      </button>
      <input
        type="text"
        min={1}
        maxLength={2}
        className="max-w-8 font-bold text-2xl appearance-none text-center"
        value={userTable.options?.state.pagination.pageIndex}
        onChange={(e) => setInputValue(Number(e.target.value))}
        onFocus={() =>
          document.addEventListener(
            "keypress",
            handleKeyPress as unknown as EventListener
          )
        }
        onBlur={() =>
          document.removeEventListener(
            "keypress",
            handleKeyPress as unknown as EventListener
          )
        }
        onKeyDown={handleKeyPress}
      />

      <button onClick={() => userTable.nextPage()}>
        <Forward />
      </button>
    </div>
  );
};

export default PageController;
