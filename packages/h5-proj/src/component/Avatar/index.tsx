import { Avatar } from "antd-mobile";
import { useUserLoginInfo } from "@web/context/user";
import Avatar_SVG from '@web/assets/avatar.svg';


function UserAvatar() {
    const { avatar } = useUserLoginInfo();
    const url = avatar || Avatar_SVG;
    return <Avatar style={{ '--size': '30px' }} src={url}></Avatar>;
}

export { UserAvatar };