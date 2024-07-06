import { useEffect, useState } from "react";
import { message, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { User } from "proj-service";
import { Model } from "proj-type";

import {
  fetchRemoveUser,
  fetchSearchUserLoginInfo,
  fetchUpdateUserRole,
} from "./service";
import SearchBar, { SearchBarQuery } from "./component/SearchBar";
import UserTable from "./component/UserTable";
import EditDialog from "./component/EditDialog";

import "./index.less";

function Admin() {
  const [searchQuery, setSearchQuery] = useState<SearchBarQuery>({
    type: "userId",
    value: "",
  });

  const [pageNo, setPageNo] = useState(0);
  const [limit, setLimit] = useState(10);
  const [userRecords, setUserRecords] = useState<
    Model.Pagination<User.UserLoginInfo>
  >({
    total: 0,
    data: [] as User.UserLoginInfo[],
  });

  const [selectIndex, setSelectIndex] = useState(-1);
  const [userLoginInfoForm, setUserLoginInfoForm] =
    useState<User.UserLoginInfo | null>(null);

  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);

  const handleClickSearchButton = async () => {
    try {
      const users = await fetchSearchUserLoginInfo({
        ...searchQuery,
        limit,
        pageNo,
      });
      setUserRecords(users);
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleChangeTable = async (no: number, size: number) => {
    setPageNo(no);
    setLimit(size);
    const users = await fetchSearchUserLoginInfo({
      ...searchQuery,
      limit: size,
      pageNo: no,
    });
    setUserRecords(users);
  };

  const handleClickEditTag = (index: number) => {
    setSelectIndex(index);
    setUserLoginInfoForm({ ...userRecords.data[index] });
    setIsEditDialogVisible(true);
  };

  const { confirm } = Modal;
  const handleClickDeleteTag = (index: number) => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleFilled />,
      content: "您是否确定删除此用户？",
      okText: "删除",
      cancelText: "取消",
      async onOk() {
        await fetchRemoveUser(userRecords.data[index].userId);
        const _users = [...userRecords.data];
        _users.splice(index, 1);
        setUserRecords({ ...userRecords, data: _users });
      },
      onCancel() {
        // noop
      },
    });
  };

  const handleClickDialogSubmitButton = async () => {
    try {
      const { userId, role } = userLoginInfoForm!;
      await fetchUpdateUserRole(userId, role);
      setIsEditDialogVisible(false);
      const _users = [...userRecords.data];
      _users.splice(selectIndex, 1, { ...userLoginInfoForm! });
      setUserRecords({ ...userRecords, data: _users });
    } catch (err: any) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    handleChangeTable(pageNo, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="admin-page">
      <SearchBar
        query={searchQuery}
        onChange={setSearchQuery}
        onClickConfirmButton={handleClickSearchButton}
      />
      <UserTable
        data={userRecords}
        limit={limit}
        pageNo={pageNo}
        onChangeTable={handleChangeTable}
        onClickEditTag={handleClickEditTag}
        onClickDeleteTag={handleClickDeleteTag}
      />

      {userLoginInfoForm && (
        <EditDialog
          visible={isEditDialogVisible}
          form={userLoginInfoForm}
          onChangeForm={setUserLoginInfoForm}
          onCloseModal={() => setIsEditDialogVisible(false)}
          onConfirm={handleClickDialogSubmitButton}
        />
      )}
    </div>
  );
}

export default Admin;
