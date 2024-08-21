import Client from "./client";
import Server from "./server";

function APage() {
    const a = 1

    return <Client>
        <Server a={a} />
    </Client>;
}

export default APage;