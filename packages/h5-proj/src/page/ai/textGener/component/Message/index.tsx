import { SpinLoading, Avatar } from 'antd-mobile'
import { AITextGener } from "proj-service";
import { MarkdownText } from "@web/component";
import GPT_SVG from "@web/assets/gpt.svg";
import { UserAvatar } from "@/component/Avatar";


function UserMessageBox({ content }: { content: string }) {
    return (
        <div className="w-full flex items-start gap-10 justify-end mb-10">
            <div className="w-fit text-left max-w-[300px]  gap-2 bg-green-600 rounded-[5px] p-[12px] text-[12px]/[16px] break-all text-white">{content}</div>
            <UserAvatar />
        </div>
    );
}

function GPTMessageBox({ content }: { content: string }) {
    return (
        <div className="w-full flex items-start gap-10 mb-10">
            <Avatar style={{ '--size': '30px' }} src={GPT_SVG} />
            {content.length > 0 ? (
                <MarkdownText
                    content={content}
                    markdownClassName='max-w-[300px] text-left'
                    hlStyle={{
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "10px 0",
                        overflowX: "auto",
                    }}
                    iconStyle={{
                        top: "2px",
                        right: "2px",
                        cursor: "pointer",
                        width: "15px",
                        height: "15px",
                    }}
                />
            ) : (
                <div className="w-fit max-w-[300px] bg-[azure] border border-solid border-[blue] rounded-[5px] p-[12px] text-[12px]/[16px] break-all">
                    <SpinLoading />
                </div>
            )}
        </div>
    );
}

function MessageBox({ message }: { message: AITextGener.Message }) {
    if (message.role === "assistant")
        return <GPTMessageBox content={message.content} />;
    return <UserMessageBox content={message.content} />;
}

export default MessageBox;