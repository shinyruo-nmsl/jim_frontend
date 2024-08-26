
import { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { Blog } from "proj-service";
import * as API from "@web/api/blog";
import BlogTable from "./component/BlogTable";
import BlogDialog, { BlogArticleForm } from "./component/BlogDialog";


function BlogAdminPage() {
    const {
        categories,
        articles,
        addCategory,
        addArticle,
        updateArticle,
        getCategory,
        getArticles,
    } = Blog.useBlogAdmin({
        getCategoryApi: API.fetchGetBlogCategories,
        addCategoryApi: API.fetchAddBlogCategory,
        getArticlesApi: API.fetchGetBlogArticles,
        addArticleApi: API.fetchAddBlogArticle,
        updateArticleApi: API.fetchUpdateBlogArticle,
    });


    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.name,
    }));

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



    return <div>
        <button onClick={() => setBlogAddDialogVisible(true)}>Add Article</button>

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

        {
            newArticle && <BlogDialog
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
        }
    </div>;
}



export default BlogAdminPage;