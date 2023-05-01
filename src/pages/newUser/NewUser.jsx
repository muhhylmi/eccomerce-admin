import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserList } from "../../redux/apiCalls";
import "./newUser.css";
import app from "../../firebase";
import { useHistory } from "react-router-dom";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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
            const user = { ...inputs, img: downloadURL };
            addUserList(user, dispatch);
            history.push("/users");
          });
        }
      );
    } else {
      addUserList(inputs, dispatch);
      history.push("/users");
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Smith"
            name="fullName"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="+1 123 456 78"
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>admin</label>
          <select
            className="newUserSelect"
            name="isAdmin"
            id="active"
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Photo</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button className="newUserButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
