import { Dialog, DialogDescription, DialogContent } from "./Dialog";

type SDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  content: React.ReactNode;

  onConfirm: () => void;
  onCancel: () => void;
};

const SDialog = ({
  open,
  onOpenChange,
  content,
  onConfirm,
  onCancel,
}: SDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[324px] bg-white py-[25px] px-[23px]"
        showCloseButton={false}
      >
        <DialogDescription className="text-[16px] font-medium text-[#111111">
          {content}
        </DialogDescription>

        <div className="flex justify-end w-full">
          <div className="flex gap-[15px] text-[16px] font-medium">
            <div onClick={onCancel} role="button" className="text-[#888888]">
              취소
            </div>
            <div onClick={onConfirm} role="button" className="text-[#FF7253]">
              확인
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SDialog;
