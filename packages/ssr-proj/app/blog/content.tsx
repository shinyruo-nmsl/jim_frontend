'use client'
import { BlogArticle } from "@web/type/blog";
import Link from "next/link";
import { useState } from "react";

function MobileContent({ data }: { data: { category: string; articles: BlogArticle[] }[] }
) {
    return (
        <div>
            {data.map((group) => (
                <div key={group.category}>
                    <h2>{group.category}</h2>
                    <ul>
                        {group.articles.map((article) => (
                            <li key={article.id}>
                                <Link href={`/blog/${article.id}`}>
                                    {article.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}


function PCContent({ data }: { data: { category: string; articles: BlogArticle[] }[] }) {
    const categories = data.map((group) => group.category)
    const [curIndex, setCurIndex] = useState(0)
    const curCategory = categories[curIndex]
    const curArticles = data.find((group) => group.category === curCategory)?.articles



    return (
        <div>
            <div>
                <h2>Categories</h2>
                <ul>
                    {categories.map((category, index) => (
                        <li key={category}>
                            <a onClick={() => setCurIndex(index)}>{category}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>{curCategory}</h2>
                <ul>
                    {curArticles?.map((article) => (
                        <li key={article.id}>
                            <Link href={`/blog/${article.id}`}>
                                {article.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export { MobileContent, PCContent }