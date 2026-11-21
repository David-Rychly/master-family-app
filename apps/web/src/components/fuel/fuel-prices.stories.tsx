import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardHeader, CardTitle } from "@repo/ui/components/card";
import { ErrorState } from "@repo/ui/components/error-state";
import { latestStations, storyNow } from "./fixtures";
import { FuelPrices, FuelPricesSkeleton } from "./fuel-prices";

const meta = {
  title: "App/FuelPrices",
  component: FuelPrices,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-4xl">{Story()}</div>],
  args: { stations: latestStations, now: storyNow },
} satisfies Meta<typeof FuelPrices>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Stale: Story = {
  name: "Stale · update stopped",
  args: { now: new Date("2026-11-25T09:30:00Z") },
};

export const Empty: Story = { name: "Empty · no prices yet", args: { stations: [] } };

export const Loading: Story = { render: () => <FuelPricesSkeleton /> };

export const Failed: Story = {
  name: "Error",
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Latest prices</CardTitle>
      </CardHeader>
      <ErrorState title="Couldn't load fuel prices" onRetry={() => {}} />
    </Card>
  ),
};
