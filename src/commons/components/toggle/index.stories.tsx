import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./index";

const meta = {
  title: "Commons/Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Toggle의 시각적 스타일 변형 (primary: 파랑, secondary: 초록, tertiary: 노랑)",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Toggle의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "Toggle의 테마 (라이트/다크 모드)",
    },
    checked: {
      control: "boolean",
      description: "Toggle 켜짐/꺼짐 상태",
    },
    disabled: {
      control: "boolean",
      description: "Toggle 비활성화 여부",
    },
    onChange: {
      action: "onChange",
      description: "상태 변경 콜백 (checked: boolean)",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    checked: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "medium",
    theme: "light",
    checked: false,
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    size: "medium",
    theme: "light",
    checked: false,
  },
};

export const CheckedOn: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    checked: true,
  },
};

export const CheckedOff: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    checked: false,
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "small",
    theme: "light",
    checked: false,
  },
};

export const Medium: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    checked: false,
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "large",
    theme: "light",
    checked: false,
  },
};

export const LightTheme: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    checked: true,
  },
};

export const DarkTheme: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "dark",
    checked: true,
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
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    checked: true,
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
        <Toggle
          variant="primary"
          size="medium"
          theme="light"
          checked={checked}
          onChange={setChecked}
        />
        <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
          상태: <strong>{checked ? "켜짐" : "꺼짐"}</strong>
        </p>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <Toggle variant="primary" size="medium" theme="light" checked={false} />
        <Toggle variant="primary" size="medium" theme="light" checked={true} />
        <span style={{ fontSize: "12px", color: "#888" }}>Primary</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <Toggle variant="secondary" size="medium" theme="light" checked={false} />
        <Toggle variant="secondary" size="medium" theme="light" checked={true} />
        <span style={{ fontSize: "12px", color: "#888" }}>Secondary</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <Toggle variant="tertiary" size="medium" theme="light" checked={false} />
        <Toggle variant="tertiary" size="medium" theme="light" checked={true} />
        <span style={{ fontSize: "12px", color: "#888" }}>Tertiary</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <Toggle variant="primary" size="small" theme="light" checked={true} />
        <span style={{ fontSize: "12px", color: "#888" }}>Small</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <Toggle variant="primary" size="medium" theme="light" checked={true} />
        <span style={{ fontSize: "12px", color: "#888" }}>Medium</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <Toggle variant="primary" size="large" theme="light" checked={true} />
        <span style={{ fontSize: "12px", color: "#888" }}>Large</span>
      </div>
    </div>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      <div style={{ padding: "24px", background: "#ffffff", display: "flex", gap: "16px" }}>
        <Toggle variant="primary" size="medium" theme="light" checked={false} />
        <Toggle variant="primary" size="medium" theme="light" checked={true} />
      </div>
      <div style={{ padding: "24px", background: "#1a1a1a", display: "flex", gap: "16px" }}>
        <Toggle variant="primary" size="medium" theme="dark" checked={false} />
        <Toggle variant="primary" size="medium" theme="dark" checked={true} />
      </div>
    </div>
  ),
};

export const InteractiveAllVariants: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
          상태: <strong>{checked ? "켜짐" : "꺼짐"}</strong>
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          <Toggle variant="primary" size="medium" theme="light" checked={checked} onChange={setChecked} />
          <Toggle variant="secondary" size="medium" theme="light" checked={checked} onChange={setChecked} />
          <Toggle variant="tertiary" size="medium" theme="light" checked={checked} onChange={setChecked} />
        </div>
      </div>
    );
  },
};
