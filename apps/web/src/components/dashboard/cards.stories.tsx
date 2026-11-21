import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { latestStations, storyNow } from "@/components/fuel/fixtures";
import { FuelCard } from "./cards";

const meta = {
  title: "App/Dashboard cards",
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="grid max-w-sm grid-cols-1">{Story()}</div>],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fuel: Story = { render: () => <FuelCard stations={latestStations} now={storyNow} /> };
export const FuelStale: Story = {
  name: "Fuel · update stopped",
  render: () => <FuelCard stations={latestStations} now={new Date("2026-11-25T09:30:00Z")} />,
};
export const FuelEmpty: Story = { name: "Fuel · no prices yet", render: () => <FuelCard stations={[]} now={storyNow} /> };
