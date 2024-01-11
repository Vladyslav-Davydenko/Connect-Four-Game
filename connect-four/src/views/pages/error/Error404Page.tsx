export function Error404Page(): JSX.Element {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-6xl font-semibold text-yellow">404</h1>
      <p className="mb-4 text-lg text-white">Oops! Looks like you're lost.</p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-yellow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="mt-4 text-white">
        Let's get you back{" "}
        <a href="/" className=" text-light-blue underline">
          home
        </a>
      </p>
    </div>
  );
}
