import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserList, getUserList } from "../../redux/apiCalls";

export default function UserList() {
  const userList = useSelector((state) => state.userList.userList);
  const dispatch = useDispatch();
  useEffect(() => {
    getUserList(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUserList(id, dispatch);
  };

  const columns = [
    {
      field: "user",
      headerName: "Photo",
      width: 100,
      renderCell: (params) => {
        return (
          <img
            className="userListImg"
            src={
              params.row.img ||
              "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
            }
            alt=""
          />
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">User List</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={userList}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
