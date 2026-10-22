"use client";

import { Children, useState } from "react";

// Shows the first `initial` grid items, with a toggle for the rest.
export default function ShowMore({ initial, children }) {
  const items = Children.toArray(children);
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, initial);

  return (
    <>
      {shown}
      {items.length > initial && (
        <div className="flex justify-center pt-4 lg:col-span-12">
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            className="rounded-full border border-line px-6 py-3 text-sm text-text transition-colors hover:border-rose hover:text-rose"
          >
            {all ? "Show fewer projects" : `Show all ${items.length} projects`}
          </button>
        </div>
      )}
    </>
  );
}
