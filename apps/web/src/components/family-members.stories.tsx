import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FamilyMembers } from "./family-members";

const meta = {
  title: "App/FamilyMembers",
  component: FamilyMembers,
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component:
          "Loads members from the API. With the API running (`pnpm dev`) it shows the list; without it you see the error state with Try again. The loading, empty and error states on their own are under States.",
      },
    },
  },
} satisfies Meta<typeof FamilyMembers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Live: Story = {};
