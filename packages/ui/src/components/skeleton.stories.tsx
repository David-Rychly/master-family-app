import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardHeader, CardTitle } from "./card";
import { Loading, Skeleton, SkeletonCard, SkeletonHeading, SkeletonRows } from "./skeleton";

const meta = {
  title: "States/Loading",
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          "Skeletons in the shape of the content. Wrap them in `Loading`, which announces loading to screen readers and fades the skeleton in only after 300ms.",
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cards: Story = {
  render: () => (
    <Loading label="Loading your day" className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <SkeletonCard rows={4} />
      <SkeletonCard rows={2} />
      <SkeletonCard rows={0} />
    </Loading>
  ),
};

export const RowsInACard: Story = {
  name: "Rows in a card",
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <Loading label="Loading family members">
        <SkeletonRows rows={4} />
      </Loading>
    </Card>
  ),
};

export const PageHeading: Story = {
  name: "Page heading",
  render: () => (
    <Loading label="Loading">
      <SkeletonHeading />
    </Loading>
  ),
};
