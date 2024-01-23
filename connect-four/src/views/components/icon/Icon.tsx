export function Icon(): JSX.Element {
  return (
    <div className=" grid grid-cols-2 gap-1">
      <div className="size-6 rounded-full relative animate-drop_down bg-yellow flex items-center justify-center">
        <div className="size-4 rounded-full absolute shadow-inner bg-yellow"></div>
      </div>
      <div className="size-6 rounded-full relative animate-drop_down bg-red flex items-center justify-center">
        <div className="size-4 rounded-full absolute shadow-inner bg-red"></div>
      </div>
      <div className="size-6 rounded-full relative animate-drop_down bg-red flex items-center justify-center">
        <div className="size-4 rounded-full absolute shadow-inner bg-red"></div>
      </div>
      <div className="size-6 rounded-full relative animate-drop_down bg-yellow flex items-center justify-center">
        <div className="size-4 rounded-full absolute shadow-inner bg-yellow"></div>
      </div>
    </div>
  );
}
