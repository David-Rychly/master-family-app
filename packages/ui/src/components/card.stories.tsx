import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta = {
  title: "Base/Card",
  component: Card,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Shopping list</CardTitle>
        <CardDescription>Dad added milk 10 min ago</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="type-stat">7</div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Open list
        </Button>
      </CardFooter>
    </Card>
  ),
};
