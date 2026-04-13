import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta = {
  title: "Commons/Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "버튼의 시각적 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "버튼의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "버튼의 테마 (라이트/다크 모드)",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 여부",
    },
    children: {
      control: "text",
      description: "버튼 내부 콘텐츠",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "medium",
    theme: "light",
    children: "Secondary Button",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    size: "medium",
    theme: "light",
    children: "Tertiary Button",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "small",
    theme: "light",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "large",
    theme: "light",
    children: "Large Button",
  },
};

export const LightTheme: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    children: "Light Theme",
  },
};

export const DarkTheme: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "dark",
    children: "Dark Theme",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    disabled: true,
    children: "Disabled Button",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Button variant="primary" theme="light">
        Primary
      </Button>
      <Button variant="secondary" theme="light">
        Secondary
      </Button>
      <Button variant="tertiary" theme="light">
        Tertiary
      </Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button variant="primary" size="small" theme="light">
        Small
      </Button>
      <Button variant="primary" size="medium" theme="light">
        Medium
      </Button>
      <Button variant="primary" size="large" theme="light">
        Large
      </Button>
    </div>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div style={{ padding: "20px", background: "#ffffff" }}>
        <Button variant="primary" theme="light">
          Light Theme
        </Button>
      </div>
      <div style={{ padding: "20px", background: "#1a1a1a" }}>
        <Button variant="primary" theme="dark">
          Dark Theme
        </Button>
      </div>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Button variant="primary" theme="light" disabled>
        Primary Disabled
      </Button>
      <Button variant="secondary" theme="light" disabled>
        Secondary Disabled
      </Button>
      <Button variant="tertiary" theme="light" disabled>
        Tertiary Disabled
      </Button>
    </div>
  ),
};
