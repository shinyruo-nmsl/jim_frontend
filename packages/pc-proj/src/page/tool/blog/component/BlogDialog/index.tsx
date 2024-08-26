import { useEffect, useState } from "react";
import { Form, Select, Modal, Input, Upload, Button, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Blog } from "proj-service";
import { Opiton } from "@type/model";
import { fetchUploadMarkdownFile } from "@web/api/file";


interface BlogDialogProps {
    visible: boolean;
    categories: Opiton<string>[];
    article: Blog.BlogArticleForm;
    onCloseModal: () => void;
    onConfirm: (form: Blog.BlogArticleForm) => void;
}

function BlogDialog({
    visible,
    article,
    categories,
    onCloseModal,
    onConfirm,
}: BlogDialogProps) {
    const [form, setForm] = useState(article);

    const handleUploadMarkdown = async (uploadFile: UploadFile) => {
        const file = uploadFile.originFileObj!;

        if (uploadFile.status === "uploading") {
            const { url } = await fetchUploadMarkdownFile({ mdFile: file });
            setForm({ ...form, link: url });
        }
    };


    const handleConfirm = () => {
        onConfirm(form);
    }

    useEffect(() => {
        setForm(article);
    }, [article]);


    return (
        <Modal
            open={visible}
            title="用户信息调整"
            centered
            cancelText="取消"
            okText="确认"
            onCancel={onCloseModal}
            onOk={handleConfirm}
        >
            <Form>
                <Form.Item label="Category">
                    <Select
                        value={form.category}
                        onChange={(category) => setForm({ ...form, category })}
                    >
                        {categories.map(({ label, value }) => (
                            <Select.Option value={value}>{label}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Link">
                    <p>{form.link}</p>
                    <Upload
                        accept="image/png, image/jpeg"
                        customRequest={() => { }}
                        onChange={({ file }) => handleUploadMarkdown(file)}
                        itemRender={() => <></>}
                    >
                        <Button size="small" icon={<UploadOutlined />}>
                            点击上传
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Title">
                    <Input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default BlogDialog;