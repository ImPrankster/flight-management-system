"use client";
import { Button } from "~/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="m-2 mt-8 space-y-2">
      <p className="text-xl text-destructive">{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
