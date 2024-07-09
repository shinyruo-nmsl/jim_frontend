import { Modal, Form, Upload, Button, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface FormDialogProps {
  visible: boolean;
  imgUrl: string;
  decrption: string;
  onCancel: () => void;
}

function FormDialog({ visible, imgUrl, decrption, onCancel }: FormDialogProps) {
  return (
    <Modal
      title="添加图片和描述"
      open={visible}
      onOk={() => {}}
      onCancel={onCancel}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="上传图片">
          <div className="flex items-end">
            {imgUrl && (
              <img
                src={imgUrl}
                alt="上传图片"
                style={{ width: 100, height: 100 }}
              />
            )}

            <Upload
              accept="image/png, image/jpeg"
              customRequest={() => {}}
              itemRender={() => <></>}
            >
              <Button size="small" icon={<UploadOutlined />}>
                点击上传
              </Button>
            </Upload>
          </div>
        </Form.Item>

        <Form.Item label="图片描述">
          <Input.TextArea
            className="w-80 h-80"
            maxLength={100}
            placeholder="请输入图片描述"
            value={decrption}
            onChange={() => {}}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormDialog;
