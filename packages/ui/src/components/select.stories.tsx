import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const meta = {
  title: "Base/Select",
  component: Select,
  decorators: [(Story) => <div className="flex max-w-sm flex-col gap-2">{Story()}</div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Label htmlFor="who">Who buys it</Label>
      <Select defaultValue="anyone">
        <SelectTrigger id="who" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="anyone">Anyone</SelectItem>
          <SelectItem value="mom">Mom</SelectItem>
          <SelectItem value="dad">Dad</SelectItem>
          <SelectItem value="ella">Ella</SelectItem>
        </SelectContent>
      </Select>
    </>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <>
      <Label htmlFor="shop">Shop</Label>
      <Select>
        <SelectTrigger id="shop" className="w-full">
          <SelectValue placeholder="Pick a shop" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="market">Market</SelectItem>
          <SelectItem value="bakery">Bakery</SelectItem>
        </SelectContent>
      </Select>
    </>
  ),
};
