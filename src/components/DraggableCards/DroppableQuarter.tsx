import React, { useEffect, useRef } from "react";
import { DroppableQuarterProps } from "@/app/utils/types";
import autoAnimate from "@formkit/auto-animate";
import { useDroppable } from "@dnd-kit/core";

const DroppableQuarter: React.FC<DroppableQuarterProps> = ({
  id,
  season,
  year,
  children,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const parentRef = useRef(null);

  // Initialize auto-animate for smooth transitions
  useEffect(() => {
    if (parentRef.current) autoAnimate(parentRef.current);
  }, [parentRef]);

  const style = {
    backgroundColor: isOver ? "lightgreen" : "white", 
    padding: "10px",
    minHeight: "100px",
  };

  return (
    <div ref={setNodeRef} style={style} className="border-solid border-2 #000 rounded-md shadow-md">
      <h3 className="font-bold">
        {season} {year}
      </h3>
      <div ref={parentRef}>{children}</div> {/* Auto-animate applied here */}
    </div>
  );
};

export default DroppableQuarter;
