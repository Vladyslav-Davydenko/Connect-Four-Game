import { memo } from "react";
import { Link } from "react-router-dom";

export const ReturnButton = memo((): JSX.Element => {
  return (
    <Link
      to={"/"}
      className="py-1 px-2 border-white text-white border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards text-center"
    >
      Return Back
    </Link>
  );
});
