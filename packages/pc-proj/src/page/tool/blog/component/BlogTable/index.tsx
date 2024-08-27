import { Table, Space, TableProps } from "antd";
import { BlogArticle } from "@web/type/blog";

interface BlogTableProps {
    data: BlogArticle[];
    onEdit: (index: number) => void;
}


function BlogTable({ data, onEdit }: BlogTableProps) {

    const columns: TableProps<BlogArticle>['columns'] = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Link",
            dataIndex: "link",
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "CreatedAt",
            dataIndex: "createdAt",
        },
        {
            title: "UpdatedAt",
            dataIndex: "updatedAt",
        },
        {
            title: "操作",
            key: "operate",
            render: (_, __, index) => (
                <Space>
                    <a onClick={() => onEdit(index)}>编辑</a>
                </Space>
            ),
        },
    ];

    return <Table dataSource={data} columns={columns} />
}

export default BlogTable;