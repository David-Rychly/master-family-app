import { notFound } from "next/navigation";
import { StatesGallery } from "./states-gallery";

export const metadata = { title: "States · Family App" };

// Development-only gallery of loading, empty and error states and form components.
export default function StatesPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <StatesGallery />;
}
