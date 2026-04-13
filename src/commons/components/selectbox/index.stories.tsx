import type { Meta, StoryObj } from "@storybook/react";
import { Selectbox, type SelectboxSize } from "./index";

const meta = {
  title: "Commons/Components/Selectbox",
  component: Selectbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Selectbox의 시각적 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Selectbox의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "Selectbox의 테마 (라이트/다크 모드)",
    },
    disabled: {
      control: "boolean",
      description: "Selectbox 비활성화 여부",
    },
  },
} satisfies Meta<typeof Selectbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// SelectHTMLAttributes.size(number)와 커스텀 SelectboxSize(string) 교차 타입 충돌 우회용 헬퍼
const withSize = (size: SelectboxSize) => ({ size } as object);

const defaultOptions = (
  <>
    <option value="">선택하세요</option>
    <option value="option1">옵션 1</option>
    <option value="option2">옵션 2</option>
    <option value="option3">옵션 3</option>
  </>
);

export const Primary: Story = {
  args: {
    variant: "primary",
    theme: "light",
    children: defaultOptions,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    theme: "light",
    children: defaultOptions,
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    theme: "light",
    children: defaultOptions,
  },
};

export const Small: Story = {
  render: () => (
    <Selectbox {...withSize("small")} variant="primary" theme="light">
      {defaultOptions}
    </Selectbox>
  ),
};

export const Medium: Story = {
  render: () => (
    <Selectbox {...withSize("medium")} variant="primary" theme="light">
      {defaultOptions}
    </Selectbox>
  ),
};

export const Large: Story = {
  render: () => (
    <Selectbox {...withSize("large")} variant="primary" theme="light">
      {defaultOptions}
    </Selectbox>
  ),
};

export const LightTheme: Story = {
  args: {
    variant: "primary",
    theme: "light",
    children: defaultOptions,
  },
};

export const DarkTheme: Story = {
  args: {
    variant: "primary",
    theme: "dark",
    children: defaultOptions,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    theme: "light",
    disabled: true,
    children: defaultOptions,
  },
};

export const WithManyOptions: Story = {
  render: () => (
    <Selectbox variant="primary" theme="light">
      <option value="">카테고리를 선택하세요</option>
      <option value="travel">여행</option>
      <option value="food">음식</option>
      <option value="music">음악</option>
      <option value="movie">영화</option>
      <option value="book">독서</option>
      <option value="sport">운동</option>
      <option value="art">미술</option>
    </Selectbox>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Selectbox variant="primary" theme="light">
        <option value="">Primary</option>
        <option value="1">옵션 1</option>
      </Selectbox>
      <Selectbox variant="secondary" theme="light">
        <option value="">Secondary</option>
        <option value="1">옵션 1</option>
      </Selectbox>
      <Selectbox variant="tertiary" theme="light">
        <option value="">Tertiary</option>
        <option value="1">옵션 1</option>
      </Selectbox>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
      <Selectbox {...withSize("small")} variant="primary" theme="light">
        <option value="">Small</option>
        <option value="1">옵션 1</option>
      </Selectbox>
      <Selectbox {...withSize("medium")} variant="primary" theme="light">
        <option value="">Medium</option>
        <option value="1">옵션 1</option>
      </Selectbox>
      <Selectbox {...withSize("large")} variant="primary" theme="light">
        <option value="">Large</option>
        <option value="1">옵션 1</option>
      </Selectbox>
    </div>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      <div style={{ padding: "20px", background: "#ffffff" }}>
        <Selectbox variant="primary" theme="light">
          <option value="">Light Theme</option>
          <option value="1">옵션 1</option>
        </Selectbox>
      </div>
      <div style={{ padding: "20px", background: "#1a1a1a" }}>
        <Selectbox variant="primary" theme="dark">
          <option value="">Dark Theme</option>
          <option value="1">옵션 1</option>
        </Selectbox>
      </div>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Selectbox variant="primary" theme="light" disabled>
        <option value="">Primary Disabled</option>
      </Selectbox>
      <Selectbox variant="secondary" theme="light" disabled>
        <option value="">Secondary Disabled</option>
      </Selectbox>
      <Selectbox variant="tertiary" theme="light" disabled>
        <option value="">Tertiary Disabled</option>
      </Selectbox>
    </div>
  ),
};

export const DarkThemeVariants: Story = {
  render: () => (
    <div style={{ padding: "20px", background: "#1a1a1a" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Selectbox variant="primary" theme="dark">
          <option value="">Primary Dark</option>
          <option value="1">옵션 1</option>
        </Selectbox>
        <Selectbox variant="secondary" theme="dark">
          <option value="">Secondary Dark</option>
          <option value="1">옵션 1</option>
        </Selectbox>
        <Selectbox variant="tertiary" theme="dark">
          <option value="">Tertiary Dark</option>
          <option value="1">옵션 1</option>
        </Selectbox>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};
