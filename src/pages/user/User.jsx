import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import app from "../../firebase";
import { updateUserList } from "../../redux/apiCalls";
import "./user.css";

export default function User() {
  const userID = useLocation().pathname.split("/")[2];
  const userList = useSelector((state) =>
    state.userList.userList.find((userList) => userList._id === userID)
  );
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState(null);
  const [inputs, setInputs] = useState({ ...userList });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, "users/" + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            delete inputs.password;
            const user = {
              ...inputs,
              img: downloadURL,
              ...(password && { password: password }),
            };
            updateUserList(userList._id, user, dispatch);
            history.push("/users");
          });
        }
      );
    } else {
      delete inputs.password;
      const user = { ...inputs, ...(password && { password: password }) };
      updateUserList(userList._id, user, dispatch);
      history.push("/users");
    }
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                userList.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userList.username}</span>
              <span className="userShowUserTitle">
                {userList.isAdmin ? "admin" : "user"}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {userList.fullName || "fullName user"}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {userList.createdAt.substr(0, 10)}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">
                {userList.phone || "contact user"}
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userList.email}</span>
            </div>
          </div>
        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={userList.username}
                  className="userUpdateInput"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="fill to update the password"
                  className="userUpdateInput"
                  name="password"
                  onChange={handlePassword}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={userList.fullName || "fullname user"}
                  className="userUpdateInput"
                  name="fullName"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={userList.email || "email user"}
                  className="userUpdateInput"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={userList.contact || "contact user"}
                  className="userUpdateInput"
                  name="contact"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Admin</label>
                <select
                  name="isAdmin"
                  value={userList.isAdmin}
                  onChange={handleChange}
                >
                  <option value="true">yes</option>
                  <option value="false">no</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    userList.img ||
                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  }
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
