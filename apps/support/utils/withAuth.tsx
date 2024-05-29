"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Redirect } from "../redirect/Redirect";
import { getGetUser } from "../graphql/actions";
import CheckKyc from "./CheckKyc";

export default (WrappedComponent: any, options = { ssr: false }) => {
  function WithAuth(props: any) {
    const pathname = usePathname();

    const { data: { getUser } = {}, loading, error } = getGetUser();

    if (loading) {
      return <></>;
    }
    if (!loading && (!getUser || error) && typeof window !== "undefined") {
      // localStorage.removeItem("key");
      return (
        <>
          <Redirect
            to={`http://localhost:20241/auth?path=http://localhost:20243${pathname}&&host=http://localhost:20243`}
          />
        </>
      );
    }

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  }

  return WithAuth;
};
