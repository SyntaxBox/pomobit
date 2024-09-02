import { Link, useRouteError } from "react-router-dom";
import { useUI } from "../hooks";

type ErrorType = {
  statusText: string;
  message: string;
};

export default function ErrorPage() {
  const { currentPallet } = useUI();
  let error = useRouteError() as Partial<ErrorType> | undefined;
  console.error(error);

  if (
    !error ||
    typeof error.statusText !== "string" ||
    typeof error.message !== "string"
  ) {
    error = {
      statusText: "Unknown Error",
      message: "An unexpected error has occurred. Please try again later.",
    };
  }

  return (
    <div
      id="error-page"
      className="flex items-center justify-center flex-col h-screen"
      style={{
        background: currentPallet.background,
        color: currentPallet.text1,
      }}
    >
      <h1 className="font-bold text-4xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="font-semibold underline mt-2">
        Go to Home Page
      </Link>
    </div>
  );
}
