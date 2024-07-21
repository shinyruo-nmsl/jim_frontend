import { Modal, Form, Upload, Button, Input, message, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fetchUploadBase64Image } from "@/api/file";
import { File } from "proj-util";

interface FormDialogProps {
  visible: boolean;
  imgUrl: string;
  description: string;
  onChangeForm: (prompt: { imgUrl: string; description: string }) => void;
  onComfirm: () => void;
  onCancel: () => void;
}

function FormDialog({
  visible,
  imgUrl,
  description,
  onChangeForm,
  onComfirm,
  onCancel,
}: FormDialogProps) {
  const handleBeforeUpload = async (file: File) => {
    if (file.size > 1024 * 1024 * 10) {
      message.warning("文件太大啦~");
      return false;
    }
  };

  const handleUpload = async (uploadFile: UploadFile) => {
    const file = uploadFile.originFileObj!;

    if (uploadFile.status === "uploading") {
      const base64 = await File.convertImgFile2Base64(file);
      const { url } = await fetchUploadBase64Image({ base64Img: base64 });
      onChangeForm({ imgUrl: url, description });
    }
  };

  return (
    <Modal
      title="添加图片和描述"
      open={visible}
      onOk={onComfirm}
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
              beforeUpload={handleBeforeUpload}
              customRequest={() => {}}
              onChange={({ file }) => handleUpload(file)}
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
            value={description}
            onChange={(e) => {
              onChangeForm({ imgUrl, description: e.target.value });
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormDialog;
