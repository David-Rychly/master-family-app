"use client";

import { useId } from "react";

// Time of day and the date depend on the viewer's clock and locale. The server renders a
// neutral fallback; an inline script swaps in the real text before first paint, and on
// client-side navigations the component computes it directly.

function greetingNow() {
  const h = new Date().getHours();
  return h < 5 ? "Good night" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function dateNow() {
  return new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
}

function LiveText({ compute, fallback }: { compute: () => string; fallback: string }) {
  const id = useId();
  const text = typeof window === "undefined" ? fallback : compute();
  return (
    <>
      <span id={id} suppressHydrationWarning>
        {text}
      </span>
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `{var n=document.getElementById(${JSON.stringify(id)});if(n)n.textContent=(${compute.toString()})()}`,
        }}
      />
    </>
  );
}

export function Greeting({ name }: { name: string }) {
  return (
    <>
      <LiveText compute={greetingNow} fallback="Hello" />, {name}
    </>
  );
}

export function TodayDate() {
  return <LiveText compute={dateNow} fallback="Today" />;
}
