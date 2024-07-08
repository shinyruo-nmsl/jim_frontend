import { Modal } from "antd";

function FormDialog({ visible }: { visible: boolean }) {
  return (
    <Modal
      className="w-1000 h-600"
      title="AI图片处理"
      open={visible}
      onOk={() => {}}
      onCancel={() => {}}
    >
      <div className="w-1000 h-600"></div>
    </Modal>
  );
}

export default FormDialog;
