import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { MAIN_LIST } from "../Services/Queries";
import CharactersTable from "./CharactersTable";

const Footer = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery(MAIN_LIST, { variables: { page: page } });

  return (
    data && (
      <div className="flex flex-col">
        <CharactersTable characters={data.characters.results} />
        <div className="flex w-full justify-center items-center mb-8">
          <button
            onClick={() =>
              setPage((prevValue) => (prevValue !== 1 ? prevValue - 1 : 1))
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="main-grid-item-icon"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          </button>
          <p className="font-bold text-2xl mx-4">{page}</p>
          <button onClick={() => setPage((prevValue) => prevValue + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="main-grid-item-icon"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          </button>
        </div>
      </div>
    )
  );
};

export default Footer;
