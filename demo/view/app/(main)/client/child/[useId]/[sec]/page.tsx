import { fetchAllUser } from "./action";
import { UserClient } from "./client";

export const generateStaticParams = async() => {
    const users = await fetchAllUser();
    const result = users.map((user: { id: any; }) => {
        const res = [];
        for (let i=0; i<=60; i++) {
            res.push({
                userId: user.id,
                sec: i.toString(),
            })
        }
        return res;
    }) ?? [];

    return result;
}

export const dynamicParams = false;

export default () => {
    return <div>
        <UserClient />
    </div>
}