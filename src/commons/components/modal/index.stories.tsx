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
      description: "모달 유형(정보/경고)",
    },
    actions: {
      control: "select",
      options: ["single", "dual"],
      description: "확인 단일 버튼 또는 취소·확인 이중 버튼",
    },
    theme: {
      control: "select",
      options: ["light", "dark"],
      description: "모달 테마",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    description: {
      control: "text",
      description: "부가 설명 텍스트",
    },
    confirmText: {
      control: "text",
      description: "확인 버튼 라벨",
    },
    cancelText: {
      control: "text",
      description: "취소 버튼 라벨(dual일 때)",
    },
    children: {
      control: false,
      description: "본문 추가 영역",
    },
    onConfirm: { action: "confirm" },
    onCancel: { action: "cancel" },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoSingle: Story = {
  args: {
    variant: "info",
    actions: "single",
    theme: "light",
    title: "일기가 등록되었습니다.",
    description: "등록한 일기는 목록에서 확인할 수 있어요.",
    confirmText: "확인",
  },
};

export const InfoDual: Story = {
  args: {
    variant: "info",
    actions: "dual",
    theme: "light",
    title: "작성을 취소할까요?",
    description: "지금 나가면 입력한 내용이 저장되지 않습니다.",
    confirmText: "나가기",
    cancelText: "계속 작성",
  },
};

export const DangerSingle: Story = {
  args: {
    variant: "danger",
    actions: "single",
    theme: "light",
    title: "삭제할 수 없습니다.",
    description: "네트워크 오류로 요청을 완료하지 못했습니다.",
    confirmText: "확인",
  },
};

export const DangerDual: Story = {
  args: {
    variant: "danger",
    actions: "dual",
    theme: "light",
    title: "일기를 삭제할까요?",
    description: "삭제된 일기는 복구할 수 없습니다.",
    confirmText: "삭제",
    cancelText: "취소",
  },
};

export const DarkTheme: Story = {
  args: {
    variant: "info",
    actions: "dual",
    theme: "dark",
    title: "다크 테마 모달",
    description: "어두운 배경에서도 대비가 유지됩니다.",
    confirmText: "확인",
    cancelText: "취소",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const WithChildren: Story = {
  args: {
    variant: "info",
    actions: "single",
    theme: "light",
    title: "추가 콘텐츠가 있는 모달",
    description: "아래 영역에 자유 형식 콘텐츠를 넣을 수 있습니다.",
    confirmText: "닫기",
    children: (
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
        본문 슬롯(children)에 폼·리스트 등을 배치할 수 있습니다.
      </p>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    variant: "info",
    actions: "single",
    theme: "light",
    title: "설명 없이 제목만",
    confirmText: "확인",
  },
};

export const AllVariants: Story = {
  args: {
    title: "조합 미리보기",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
      }}
    >
      <Modal
        variant="info"
        actions="single"
        theme="light"
        title="정보 · 단일"
        description="안내용 모달입니다."
        confirmText="확인"
      />
      <Modal
        variant="danger"
        actions="dual"
        theme="light"
        title="경고 · 이중"
        description="위험한 작업 전 확인이 필요합니다."
        confirmText="진행"
        cancelText="취소"
      />
    </div>
  ),
};
