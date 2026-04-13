import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./index";

const meta = {
  title: "Commons/Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    currentPage: 3,
    totalPages: 10,
    maxVisible: 5,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description: "Pagination의 시각적 스타일 변형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Pagination의 크기",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "Pagination의 테마 (라이트/다크 모드)",
    },
    currentPage: {
      control: { type: "number", min: 1 },
      description: "현재 페이지 번호",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "전체 페이지 수",
    },
    maxVisible: {
      control: { type: "number", min: 1 },
      description: "최대 표시 페이지 수",
    },
    onPageChange: {
      action: "onPageChange",
      description: "페이지 변경 콜백",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    currentPage: 3,
    totalPages: 10,
    maxVisible: 5,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "medium",
    theme: "light",
    currentPage: 3,
    totalPages: 10,
    maxVisible: 5,
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    size: "medium",
    theme: "light",
    currentPage: 3,
    totalPages: 10,
    maxVisible: 5,
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "small",
    theme: "light",
    currentPage: 3,
    totalPages: 10,
    maxVisible: 5,
  },
};

export const Medium: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    currentPage: 3,
    totalPages: 10,
    maxVisible: 5,
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "large",
    theme: "light",
    currentPage: 3,
    totalPages: 10,
    maxVisible: 5,
  },
};

export const LightTheme: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    currentPage: 3,
    totalPages: 10,
  },
};

export const DarkTheme: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "dark",
    currentPage: 3,
    totalPages: 10,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const FirstPage: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    currentPage: 1,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    currentPage: 10,
    totalPages: 10,
  },
};

export const FewPages: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    currentPage: 2,
    totalPages: 3,
  },
};

export const ManyPages: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    currentPage: 50,
    totalPages: 100,
    maxVisible: 5,
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
          현재 페이지: {currentPage} / 20
        </p>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={currentPage}
          totalPages={20}
          maxVisible={5}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Pagination variant="primary" size="medium" theme="light" currentPage={3} totalPages={10} />
      <Pagination variant="secondary" size="medium" theme="light" currentPage={3} totalPages={10} />
      <Pagination variant="tertiary" size="medium" theme="light" currentPage={3} totalPages={10} />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
      <Pagination variant="primary" size="small" theme="light" currentPage={3} totalPages={10} />
      <Pagination variant="primary" size="medium" theme="light" currentPage={3} totalPages={10} />
      <Pagination variant="primary" size="large" theme="light" currentPage={3} totalPages={10} />
    </div>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      <div style={{ padding: "24px", background: "#ffffff" }}>
        <Pagination variant="primary" size="medium" theme="light" currentPage={3} totalPages={10} />
      </div>
      <div style={{ padding: "24px", background: "#1a1a1a" }}>
        <Pagination variant="primary" size="medium" theme="dark" currentPage={3} totalPages={10} />
      </div>
    </div>
  ),
};

export const DarkThemeVariants: Story = {
  render: () => (
    <div style={{ padding: "24px", background: "#1a1a1a" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Pagination variant="primary" size="medium" theme="dark" currentPage={3} totalPages={10} />
        <Pagination variant="secondary" size="medium" theme="dark" currentPage={3} totalPages={10} />
        <Pagination variant="tertiary" size="medium" theme="dark" currentPage={3} totalPages={10} />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const InteractiveAllVariants: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>현재 페이지: {page} / 10</p>
        <Pagination variant="primary" size="medium" theme="light" currentPage={page} totalPages={10} onPageChange={setPage} />
        <Pagination variant="secondary" size="medium" theme="light" currentPage={page} totalPages={10} onPageChange={setPage} />
        <Pagination variant="tertiary" size="medium" theme="light" currentPage={page} totalPages={10} onPageChange={setPage} />
      </div>
    );
  },
};
