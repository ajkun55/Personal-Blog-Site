import { Suspense } from "react";
import Main from "./Main";

function Page() {
  return (
    <Suspense fallback={<Fallback />}>
      <Main />
    </Suspense>
  );
}

export default Page;

function Fallback() {
  return <>placeholder</>;
}
