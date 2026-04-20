import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./index";

const meta = {
  title: "Commons/Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "danger"],
      description: "모달의 변형 타입",
    },
    actions: {
      control: "select",
      options: ["single", "dual"],
      description: "버튼 액션 타입",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "Modal의 테마 (라이트/다크 모드)",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    description: {
      control: "text",
      description: "모달 설명",
    },
    primaryLabel: {
      control: "text",
      description: "주요 버튼 레이블",
    },
    secondaryLabel: {
      control: "text",
      description: "보조 버튼 레이블",
    },
    onPrimaryClick: {
      action: "onPrimaryClick",
      description: "주요 버튼 클릭 핸들러",
    },
    onSecondaryClick: {
      action: "onSecondaryClick",
      description: "보조 버튼 클릭 핸들러",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoSingleLight: Story = {
  args: {
    variant: "info",
    actions: "single",
    theme: "light",
    title: "알림",
    description: "작업이 완료되었습니다.",
    primaryLabel: "확인",
  },
};

export const InfoSingleDark: Story = {
  args: {
    variant: "info",
    actions: "single",
    theme: "dark",
    title: "알림",
    description: "작업이 완료되었습니다.",
    primaryLabel: "확인",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const InfoDualLight: Story = {
  args: {
    variant: "info",
    actions: "dual",
    theme: "light",
    title: "확인 필요",
    description: "변경 사항을 저장하시겠습니까?",
    primaryLabel: "저장",
    secondaryLabel: "취소",
  },
};

export const InfoDualDark: Story = {
  args: {
    variant: "info",
    actions: "dual",
    theme: "dark",
    title: "확인 필요",
    description: "변경 사항을 저장하시겠습니까?",
    primaryLabel: "저장",
    secondaryLabel: "취소",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const DangerSingleLight: Story = {
  args: {
    variant: "danger",
    actions: "single",
    theme: "light",
    title: "오류 발생",
    description: "요청을 처리할 수 없습니다.",
    primaryLabel: "확인",
  },
};

export const DangerSingleDark: Story = {
  args: {
    variant: "danger",
    actions: "single",
    theme: "dark",
    title: "오류 발생",
    description: "요청을 처리할 수 없습니다.",
    primaryLabel: "확인",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const DangerDualLight: Story = {
  args: {
    variant: "danger",
    actions: "dual",
    theme: "light",
    title: "삭제 확인",
    description: "정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    primaryLabel: "삭제",
    secondaryLabel: "취소",
  },
};

export const DangerDualDark: Story = {
  args: {
    variant: "danger",
    actions: "dual",
    theme: "dark",
    title: "삭제 확인",
    description: "정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    primaryLabel: "삭제",
    secondaryLabel: "취소",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
