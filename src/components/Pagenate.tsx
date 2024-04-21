import React, { useContext } from "react";
import { Pagination } from "@yamada-ui/react";
import { MyContext } from "../views/Toppage";

export const Pagenate: React.FC = () => {
  const count = useContext(MyContext);

  return (
    <Pagination
      total={10}
      current={count}
      pageSize={10}
      onChange={(page) => console.log(page)}
    />
  );
};
