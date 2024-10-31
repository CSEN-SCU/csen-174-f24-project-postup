import React from "react";
import { AddClassProp } from "@/app/utils/interfaces";
import * as Sentry from "@sentry/browser"

const AddClass: React.FC<AddClassProp> = ({
  setAddingClass,
  setSelectedQuarter,
  season,
  year,
}) => {
  return (
    <div className="items-center flex">
      <button
        onClick={() => {
          setAddingClass(true);
          setSelectedQuarter([season, year]);
          Sentry.captureMessage("Add Class Button Clicked; Test","fatal");
        }}
      >
        <div className="rounded-sm transition ease-in-out delay-10 bg-slate-500 shadow-md hover:bg-slate-400 active:bg-slate-500 text-center p-2 mt-2">
          <text className="text-center text-white">Add Class</text>
        </div>
      </button>
    </div>
  );
};

export default AddClass;
