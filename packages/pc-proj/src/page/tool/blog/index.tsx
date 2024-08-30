
import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useBlogAdmin } from "@web/service/blog";
import { BlogArticleForm } from "@web/type/blog";
import BlogTable from "./component/BlogTable";
import BlogDialog from "./component/BlogDialog";


function BlogAdminPage() {
    const {
        categories,
        articles,
        addCategory,
        addArticle,
        updateArticle,
        getCategory,
        getArticles,
    } = useBlogAdmin();

    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.name,
    }));
    const [categoryAddDialogVisible, setCategoryAddDialogVisible] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const [articleIndex, setArticleIndex] = useState(-1);
    const currentArticle = articles[articleIndex];
    const [blogEditDialogVisible, setBlogEditDialogVisible] = useState(false);
    const [newArticle, setNewArticle] = useState<BlogArticleForm>({
        category: '',
        link: '',
        title: '',
    });
    const [blogAddDialogVisible, setBlogAddDialogVisible] = useState(false);



    useEffect(() => {
        getCategory();
        getArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return <div className="w-full p-24">
        <div className="flex justify-end mb-16">
            <Button onClick={() => setBlogAddDialogVisible(true)}>上传文章</Button>
            <Button className="ml-16" onClick={() => setCategoryAddDialogVisible(true)}>添加分类</Button>
        </div>

        <BlogTable
            data={articles}
            onEdit={(index) => {
                setArticleIndex(index);
                setBlogEditDialogVisible(true);
            }}
        />
        {
            currentArticle && <BlogDialog
                visible={blogEditDialogVisible}
                categories={categoryOptions}
                article={currentArticle}
                onCloseModal={() => setBlogEditDialogVisible(false)}
                onConfirm={(article) => {
                    updateArticle({ ...currentArticle, ...article });
                    setBlogEditDialogVisible(false);
                }
                }
            />
        }
        <BlogDialog
            visible={blogAddDialogVisible}
            categories={categoryOptions}
            article={newArticle}
            onCloseModal={() => setBlogAddDialogVisible(false)}
            onConfirm={(article) => {
                addArticle(article);
                setBlogAddDialogVisible(false);
                setNewArticle({
                    category: '',
                    link: '',
                    title: '',
                });
            }
            }
        />
        <Modal
            title="添加分类"
            open={categoryAddDialogVisible}
            onOk={() => {
                if (!newCategory) {
                    message.error('请输入分类');
                    return;
                }
                addCategory(newCategory);
                setCategoryAddDialogVisible(false);
                setNewCategory('');
            }}
            onCancel={() => {
                setCategoryAddDialogVisible(false);
                setNewCategory('');
            }}
        >
            <Form>
                <Form.Item label="分类">
                    <Input

                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    </div>;
}



export default BlogAdminPage;