import { useQuery } from "@apollo/client";
import { useState, FC } from "react";
import { MAIN_LIST } from "../Services/Queries";
import CharactersTable from "./CharactersTable";
import FilterBar from "./FilterBar";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PageController from "./PageController";
import Loader from "../Assets/Icons/Loader";

type FormValues = {
  name: string;
  gender: { value: string };
  species: { value: string };
  status: { value: string };
};

const Footer: FC = () => {
  const [page, setPage] = useState(1);
  const [filterCharacters, setFilterCharacters] = useState({});
  const methods = useForm<FormValues>();
  const [userTable, setUserTable] = useState({});

  //console.log(userTable.options?.state.pagination.pageIndex);

  const { data, loading } = useQuery(MAIN_LIST, {
    variables: {
      page: userTable?.options?.state.pagination.pageIndex,
      filter: filterCharacters,
    },
  });

  const getTable = (table) => {
    setUserTable(table);
  };

  const onSubmit: SubmitHandler<FormValues> = ({
    name,
    gender,
    species,
    status,
  }) => {
    setFilterCharacters({
      name: name ? name : "",
      gender: gender ? gender.value : "",
      species: species ? species.value : "",
      status: status ? status.value : "",
    });
  };

  return (
    <div className="flex flex-col">
      <FormProvider {...methods}>
        <form>
          <FilterBar onSubmit={methods.handleSubmit(onSubmit)} />
          {!data ? (
            <div className="w-full h-[800px] grid place-items-center">
              <Loader variant="black" />
            </div>
          ) : (
            <CharactersTable characters={data.characters} getTable={getTable} />
          )}
        </form>
      </FormProvider>
      <PageController page={page} setPage={setPage} userTable={userTable} />
    </div>
  );
};

export default Footer;
