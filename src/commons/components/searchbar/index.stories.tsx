import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Searchbar, type SearchbarSize } from "./index";

const meta = {
  title: "Commons/Components/Searchbar",
  component: Searchbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Searchbar의 시각적 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Searchbar의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "Searchbar의 테마 (라이트/다크 모드)",
    },
    disabled: {
      control: "boolean",
      description: "Searchbar 비활성화 여부",
    },
    placeholder: {
      control: "text",
      description: "Searchbar placeholder 텍스트",
    },
    onSearch: {
      action: "onSearch",
      description: "Enter 입력 시 검색 콜백 (value 전달)",
    },
  },
} satisfies Meta<typeof Searchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// HTMLInputElement.size(number)와 커스텀 SearchbarSize(string) 교차 타입 충돌 우회용 헬퍼
const withSize = (size: SearchbarSize) => ({ size } as object);

export const Primary: Story = {
  args: {
    variant: "primary",
    theme: "light",
    placeholder: "검색어를 입력하세요",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    theme: "light",
    placeholder: "검색어를 입력하세요",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    theme: "light",
    placeholder: "검색어를 입력하세요",
  },
};

export const Small: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Searchbar {...withSize("small")} variant="primary" theme="light" placeholder="Small Searchbar" />
    </div>
  ),
};

export const Medium: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Searchbar {...withSize("medium")} variant="primary" theme="light" placeholder="Medium Searchbar" />
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Searchbar {...withSize("large")} variant="primary" theme="light" placeholder="Large Searchbar" />
    </div>
  ),
};

export const LightTheme: Story = {
  args: {
    variant: "primary",
    theme: "light",
    placeholder: "Light Theme Searchbar",
  },
};

export const DarkTheme: Story = {
  args: {
    variant: "primary",
    theme: "dark",
    placeholder: "Dark Theme Searchbar",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    theme: "light",
    placeholder: "Disabled Searchbar",
    disabled: true,
  },
};

export const WithDefaultValue: Story = {
  args: {
    variant: "primary",
    theme: "light",
    defaultValue: "React 컴포넌트",
  },
};

export const Interactive: Story = {
  render: () => {
    const [result, setResult] = useState<string | null>(null);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "320px" }}>
        <Searchbar
          variant="primary"
          theme="light"
          placeholder="검색어 입력 후 Enter"
          onSearch={(value) => setResult(value)}
        />
        {result !== null && (
          <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
            검색어: <strong>{result}</strong>
          </p>
        )}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      <Searchbar variant="primary" theme="light" placeholder="Primary Searchbar" />
      <Searchbar variant="secondary" theme="light" placeholder="Secondary Searchbar" />
      <Searchbar variant="tertiary" theme="light" placeholder="Tertiary Searchbar" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      <Searchbar {...withSize("small")} variant="primary" theme="light" placeholder="Small" />
      <Searchbar {...withSize("medium")} variant="primary" theme="light" placeholder="Medium" />
      <Searchbar {...withSize("large")} variant="primary" theme="light" placeholder="Large" />
    </div>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      <div style={{ padding: "20px", background: "#ffffff" }}>
        <Searchbar variant="primary" theme="light" placeholder="Light Theme" style={{ width: "320px" }} />
      </div>
      <div style={{ padding: "20px", background: "#1a1a1a" }}>
        <Searchbar variant="primary" theme="dark" placeholder="Dark Theme" style={{ width: "320px" }} />
      </div>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      <Searchbar variant="primary" theme="light" placeholder="Primary Disabled" disabled />
      <Searchbar variant="secondary" theme="light" placeholder="Secondary Disabled" disabled />
      <Searchbar variant="tertiary" theme="light" placeholder="Tertiary Disabled" disabled />
    </div>
  ),
};

export const DarkThemeVariants: Story = {
  render: () => (
    <div style={{ padding: "20px", background: "#1a1a1a" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
        <Searchbar variant="primary" theme="dark" placeholder="Primary Dark" />
        <Searchbar variant="secondary" theme="dark" placeholder="Secondary Dark" />
        <Searchbar variant="tertiary" theme="dark" placeholder="Tertiary Dark" />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};
