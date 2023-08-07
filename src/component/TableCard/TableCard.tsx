import React from "react";
import "./TableCard.css";

interface Props {
  children: React.ReactNode;
}

const TableCard = ({ children }: Props) => {
  return <div className="table-card-container">{children}</div>;
};

export default TableCard;
