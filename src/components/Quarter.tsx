import React from "react";

interface QuarterProps {
  quarterSeason: string;
  year: string;
}

const Quarter: React.FC<QuarterProps> = ({ quarterSeason, year }) => {
  return (
    <div className="">
      <p>{quarterSeason} - {year}</p>
    </div>
  );
};

export default Quarter
