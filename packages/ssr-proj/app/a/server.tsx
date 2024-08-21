'use server';

async function Server(props: { a: 1 }) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return <div>{props.a}</div>;
}

export default Server;