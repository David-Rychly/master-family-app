import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 rounded-md" aria-label="Family App home">
      <span className="grid size-8 place-items-center rounded-[10px] bg-primary font-display text-[17px] font-semibold text-primary-foreground">
        F
      </span>
      <span className="font-display text-[17px] font-semibold tracking-[-0.01em] max-sm:hidden">Family</span>
    </Link>
  );
}
