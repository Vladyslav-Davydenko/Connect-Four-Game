import { Link } from "react-router-dom";

export function InfoPage(): JSX.Element {
  return (
    <div className="w-[70%] flex justify-center content-center flex-col mb-20">
      <h1 className=" text-yellow text-7xl mb-20 animate-wiggle text-center">
        Some basic rules
      </h1>
      <div className="flex flex-col gap-20 text-lg my-5">
        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-6">
          <div className=" size-16 bg-yellow rounded-full relative shadow-xl">
            <div className=" size-12 bg-yellow rounded-full absolute inset-2 shadow-inner"></div>
          </div>
          <p className="w-[90%] animate-appear_left_1 transition-all duration-500 opacity-0 fill-mode-forwards col-span-2">
            Players choose yellow or red discs. They drop the discs into the
            grid, starting in the middle or at the edge to stack their colored
            discs upwards, horizontally, or diagonally.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-6">
          <p className="w-[90%] animate-appear_right_1 transition-all duration-500 opacity-0 fill-mode-forwards order-2 md:order-1 col-span-2">
            Use strategy to block opponents while aiming to be the first player
            to get 4 in a row to win.
          </p>
          <div className="order-1 md:order-2">
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <g id="strategy">
                <circle className="cls-1" cx="19.16" cy="3.89" r="2.39" />
                <line
                  className="cls-1"
                  x1="2.45"
                  y1="7.23"
                  x2="6.27"
                  y2="11.05"
                />
                <line
                  className="cls-1"
                  x1="6.27"
                  y1="7.23"
                  x2="2.45"
                  y2="11.05"
                />
                <line
                  className="cls-1"
                  x1="17.73"
                  y1="15.82"
                  x2="21.55"
                  y2="19.64"
                />
                <line
                  className="cls-1"
                  x1="21.55"
                  y1="15.82"
                  x2="17.73"
                  y2="19.64"
                />
                <path
                  className="cls-2"
                  d="M15.07,8.18l-4.74,4.74a4.78,4.78,0,0,0,0,6.75l2.83,2.83"
                />
                <polyline
                  className="cls-1"
                  points="12 8.18 14.86 8.18 14.86 11.04"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-6">
          <div className=" size-16 bg-red rounded-full relative shadow-xl">
            <div className=" size-12 bg-red rounded-full absolute inset-2 shadow-inner"></div>
          </div>
          <p className="w-[90%] animate-appear_left_2 transition-all duration-500 opacity-0 fill-mode-forwards col-span-2">
            The Connect 4 game is a great choice for a play date, a rainy day
            activity, or anytime your kids want a fun game to play with a
            friend. It's fun to go 4 the win!
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <Link
          className="py-3 px-6 bg-white text-primary border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_right_2 fill-mode-backwards transition-all"
          to={"/"}
        >
          Back
        </Link>
      </div>
    </div>
  );
}
