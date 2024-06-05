import { Avatar, AvatarProps } from "antd";
import { useUserLoginInfo } from "@/context/user";

function UserAvatar(avatarProps: AvatarProps) {
  const { userName, avatar } = useUserLoginInfo();
  if (avatar) return <Avatar {...avatarProps} src={avatar} />;
  if (userName)
    return <Avatar {...avatarProps}>{userName[userName.length - 1]}</Avatar>;
  return <Avatar {...avatarProps}>佚</Avatar>;
}

function CharacterAvatar({
  characterName,
  avatar,
  ...avatarProps
}: { characterName?: string; avatar?: string } & AvatarProps) {
  if (avatar) return <Avatar {...avatarProps} src={avatar} />;
  if (characterName)
    return (
      <Avatar {...avatarProps}>
        {characterName[characterName.length - 1]}
      </Avatar>
    );
  return <Avatar {...avatarProps}>佚</Avatar>;
}

export { UserAvatar, CharacterAvatar };
