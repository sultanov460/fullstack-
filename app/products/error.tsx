"use client";

interface ErrorBoundaryProps {
  reset: () => void;
  error: Error;
}

const Error = ({ error, reset }: ErrorBoundaryProps) => {
  return (
    <div className="text-center pt-15 flex flex-col gap-3 items-center justify-center">
      <h1 className="text-9xl font-extrabold text-primary pb-5 border-b border-primary inline">
        500
      </h1>
      <p className="text-red-700 text-2xl">{error.message}</p>
      <button onClick={reset} className="text-4xl text-primary cursor-pointer">
        Reset
      </button>
    </div>
  );
};

export default Error;
