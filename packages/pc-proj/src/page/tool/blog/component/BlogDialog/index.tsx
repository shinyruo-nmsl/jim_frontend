import { useEffect, useState } from "react";
import { Form, Select, Modal, Input, Upload, Button, UploadFile, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { BlogArticleForm } from "@web/type/blog";
import { Opiton } from "@type/model";
import { fetchUploadMarkdownFile } from "@web/api/file";


interface BlogDialogProps {
    visible: boolean;
    categories: Opiton<string>[];
    article: BlogArticleForm;
    onCloseModal: () => void;
    onConfirm: (form: BlogArticleForm) => void;
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
        if (!form.category) {
            message.error("请选择分类");
            return;
        }
        if (!form.link) {
            message.error("请上传文章");
            return;
        }
        if (!form.title) {
            message.error("请输入标题");
            return;
        }
        onConfirm(form);
    }

    useEffect(() => {
        setForm(article);
    }, [article]);


    return (
        <Modal
            open={visible}
            title="上传文章"
            centered
            cancelText="取消"
            okText="确认"
            onCancel={onCloseModal}
            onOk={handleConfirm}
        >
            <Form>
                <Form.Item label="分类">
                    <Select
                        value={form.category}
                        onChange={(category) => setForm({ ...form, category })}
                    >
                        {categories.map(({ label, value }) => (
                            <Select.Option key={value} value={value}>{label}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="链接">
                    <p>{form.link}</p>
                    <Upload
                        accept=".md"
                        customRequest={() => { }}
                        onChange={({ file }) => handleUploadMarkdown(file)}
                        itemRender={() => <></>}
                    >
                        <Button size="small" icon={<UploadOutlined />}>
                            点击上传
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="标题">
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