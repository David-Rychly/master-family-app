import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Base/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="list" className="max-w-sm">
      <TabsList>
        <TabsTrigger value="list">List</TabsTrigger>
        <TabsTrigger value="bought">Bought</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="list" className="pt-3 text-muted-foreground">
        7 items still to buy.
      </TabsContent>
      <TabsContent value="bought" className="pt-3 text-muted-foreground">
        3 items bought today.
      </TabsContent>
      <TabsContent value="history" className="pt-3 text-muted-foreground">
        Last week&apos;s lists.
      </TabsContent>
    </Tabs>
  ),
};
