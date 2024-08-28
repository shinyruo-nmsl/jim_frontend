"use client";
import { BlogArticle } from "@web/type/blog";
import Link from "next/link";
import { useState } from "react";

function MobileContent({
    data,
}: {
    data: { category: string; articles: BlogArticle[] }[];
}) {
    return (
        <>
            {data.map((group) => (
                <MobileContentItem
                    key={group.category}
                    category={group.category}
                    articles={group.articles}
                />
            ))}
        </>
    );
}

function MobileContentItem({
    category,
    articles,
}: {
    category: string;
    articles: BlogArticle[];
}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-[80%] mx-auto pt-20">
            <div className="w-full flex justify-between items-center">
                <h2 className="font-bold text-18 mb-10">{category}</h2>
                {isOpen && (
                    <i className="icon-arrow-up text-gray-200" onClick={() => setIsOpen(false)}></i>
                )}
                {!isOpen && (
                    <i className="icon-arrow-down text-gray-200" onClick={() => setIsOpen(true)}></i>
                )}
            </div>
            {isOpen && (
                <ul className="text-12">
                    {articles.map((article) => (
                        <li className="flex justify-between items-center" key={article.id}>
                            <Link href={`/blog/${article.id}`}>{article.title}</Link>
                            <p>{article.createdAt}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function PCContent({
    data,
}: {
    data: { category: string; articles: BlogArticle[] }[];
}) {
    const categories = data.map((group) => group.category);
    const [curIndex, setCurIndex] = useState(0);
    const curCategory = categories[curIndex];
    const curArticles = data.find(
        (group) => group.category === curCategory
    )?.articles;



    return (
        <div className="flex h-[90%]">
            <ul className="w-200 flex-none bg-azure h-full">
                {categories.map((category, index) => (
                    <li className={`p-10 ${curIndex === index ? 'text-blue' : ''}`} key={category}>
                        <a onClick={() => setCurIndex(index)}>{category}</a>
                    </li>
                ))}
            </ul>

            <div className="flex-auto p-20">
                <ul>
                    {curArticles?.map((article) => (
                        <li className="flex justify-between items-center" key={article.id}>
                            <Link href={`/blog/${article.id}`}>{article.title}</Link>
                            <p>{article.createdAt}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export { MobileContent, PCContent };
