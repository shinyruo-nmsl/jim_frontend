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
            title: "分类",
            dataIndex: "category",
        },
        {
            title: "标题",
            dataIndex: "title",
            render: (text, record) => <Space><a href={record.link}>{text}</a>
            </Space>
        },
        {
            title: "创建时间",
            dataIndex: "createdAt",
        },
        {
            title: "修改时间",
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