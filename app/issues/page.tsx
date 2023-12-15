import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const issuesPage = () => {
  return (
    <div>
      <Link href={`/issues/new`}>
        <Button>New Issue</Button>
      </Link>
    </div>
  );
};

export default issuesPage;
