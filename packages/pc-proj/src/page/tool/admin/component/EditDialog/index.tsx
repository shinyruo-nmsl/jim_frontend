import { Form, Select, Modal } from "antd";
import { User } from "proj-service";

interface EditDialogProps {
  visible: boolean;
  form: User.UserLoginInfo;
  onCloseModal: () => void;
  onChangeForm: (form: User.UserLoginInfo) => void;
  onConfirm: () => void;
}

function EditDialog({
  visible,
  form,
  onChangeForm,
  onCloseModal,
  onConfirm,
}: EditDialogProps) {
  return (
    <Modal
      open={visible}
      title="用户信息调整"
      centered
      cancelText="取消"
      okText="确认"
      onCancel={onCloseModal}
      onOk={onConfirm}
    >
      <Form>
        <Form.Item label="用户名">
          <p>{form.account}</p>
        </Form.Item>

        <Form.Item label="角色">
          <Select
            value={form.role}
            onChange={(role) => onChangeForm({ ...form, role })}
          >
            {User.UserRoleOptions.map(({ label, value }) => (
              <Select.Option value={value}>{label}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditDialog;
