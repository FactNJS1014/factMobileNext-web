import { Suspense } from "react";
import PrintClient from "./printclient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PrintClient />
    </Suspense>
  );
}
