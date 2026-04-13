import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./index";

const meta = {
  title: "Commons/Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Input의 시각적 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Input의 크기",
      table: {
        type: { summary: "InputSize" },
      },
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "Input의 테마 (라이트/다크 모드)",
    },
    disabled: {
      control: "boolean",
      description: "Input 비활성화 여부",
    },
    placeholder: {
      control: "text",
      description: "Input placeholder 텍스트",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
      description: "Input type 속성",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium" as const,
    theme: "light",
    placeholder: "텍스트를 입력하세요",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "medium" as const,
    theme: "light",
    placeholder: "텍스트를 입력하세요",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    size: "medium" as const,
    theme: "light",
    placeholder: "텍스트를 입력하세요",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "small" as const,
    theme: "light",
    placeholder: "Small Input",
  },
};

export const Medium: Story = {
  args: {
    variant: "primary",
    size: "medium" as const,
    theme: "light",
    placeholder: "Medium Input",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "large" as const,
    theme: "light",
    placeholder: "Large Input",
  },
};

export const LightTheme: Story = {
  args: {
    variant: "primary",
    size: "medium" as const,
    theme: "light",
    placeholder: "Light Theme Input",
  },
};

export const DarkTheme: Story = {
  args: {
    variant: "primary",
    size: "medium" as const,
    theme: "dark",
    placeholder: "Dark Theme Input",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "medium" as const,
    theme: "light",
    placeholder: "Disabled Input",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    variant: "primary",
    size: "medium" as const,
    theme: "light",
    defaultValue: "입력된 값",
  },
};

export const PasswordType: Story = {
  args: {
    variant: "primary",
    size: "medium" as const,
    theme: "light",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
  },
};

export const EmailType: Story = {
  args: {
    variant: "primary",
    size: "medium" as const,
    theme: "light",
    type: "email",
    placeholder: "이메일을 입력하세요",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Input variant="primary" theme="light" placeholder="Primary Input" />
      <Input variant="secondary" theme="light" placeholder="Secondary Input" />
      <Input variant="tertiary" theme="light" placeholder="Tertiary Input" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Input variant="primary" size={"small" as const} theme="light" placeholder="Small Input" />
      <Input variant="primary" size={"medium" as const} theme="light" placeholder="Medium Input" />
      <Input variant="primary" size={"large" as const} theme="light" placeholder="Large Input" />
    </div>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ padding: "20px", background: "#ffffff" }}>
        <Input variant="primary" theme="light" placeholder="Light Theme Input" style={{ width: "300px" }} />
      </div>
      <div style={{ padding: "20px", background: "#1a1a1a" }}>
        <Input variant="primary" theme="dark" placeholder="Dark Theme Input" style={{ width: "300px" }} />
      </div>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Input variant="primary" theme="light" placeholder="Primary Disabled" disabled />
      <Input variant="secondary" theme="light" placeholder="Secondary Disabled" disabled />
      <Input variant="tertiary" theme="light" placeholder="Tertiary Disabled" disabled />
    </div>
  ),
};

export const VariousInputTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Input variant="primary" theme="light" type="text" placeholder="텍스트 입력" />
      <Input variant="primary" theme="light" type="password" placeholder="비밀번호 입력" />
      <Input variant="primary" theme="light" type="email" placeholder="이메일 입력" />
      <Input variant="primary" theme="light" type="number" placeholder="숫자 입력" />
      <Input variant="primary" theme="light" type="tel" placeholder="전화번호 입력" />
      <Input variant="primary" theme="light" type="url" placeholder="URL 입력" />
    </div>
  ),
};

export const DarkThemeVariants: Story = {
  render: () => (
    <div style={{ padding: "20px", background: "#1a1a1a" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
        <Input variant="primary" theme="dark" placeholder="Primary Dark" />
        <Input variant="secondary" theme="dark" placeholder="Secondary Dark" />
        <Input variant="tertiary" theme="dark" placeholder="Tertiary Dark" />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};
