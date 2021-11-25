import axios from "axios";
import User from "./User";
import UserTodo from "./UserTodo";
import UserPosts from "./UserPosts";
import { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import AddPost from "./AddPost";
import AddUser from "./AddUser";

function Users() {
  const [users, setUsers] = useState([]);
  const [fndUsers, setFndUsers] = useState([]);
  const [input, setInput] = useState("");
  const [userDivTodosTemplateOpen, setUserDivTodosTemplateOpen] = useState(false);
  const [userID, setUserId] = useState("");
  const [userObj, setUserObj] = useState({});
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [isTodoList, setIsTodoList] = useState(true);
  const [isPostList, setIsPostList] = useState(true);
  const [isAddUser, setIsAddUser] = useState(false);

  useEffect(async () => {
    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    let usersArr = resp.data;

    let resp2 = await axios.get("https://jsonplaceholder.typicode.com/posts");
    let postsArr = resp2.data;
    // setPosts(postsArr);

    let resp3 = await axios.get("https://jsonplaceholder.typicode.com/todos");
    let todosArr = resp3.data;
    // setTodos(todosArr);

    for (let i = 0; i < usersArr.length; i++) {
      usersArr[i].todos = todosArr.filter(
        (tod) => tod.userId === usersArr[i].id
      );
      usersArr[i].posts = postsArr.filter(
        (post) => post.userId === usersArr[i].id
      );
    }

    //console.log(usersArr)

    setUsers(usersArr);
    setFndUsers(usersArr);
    console.log(fndUsers);
  }, []);

  useEffect(() => {
    let usersArr = [...users];
    input !== ""
      ? setFndUsers(
          usersArr.filter(
            (user) =>
              user.name.toLowerCase().includes(input.toLowerCase()) ||
              user.email.toLowerCase().includes(input.toLowerCase())
          )
        )
      : setFndUsers(users);
  }, [input]);

  ////////////////////
  //////////////////
  /////////Methods

  const deleteUser = () => {
    let usersArr = [...users];

    let filterUsers = usersArr.filter((user) => user.id !== userID);
    
    setUserId("")
    setUsers(filterUsers);
    setFndUsers(filterUsers);
    
  };

  const updateUser = (id, obj) => {
    let usersArr = [...users];

    let userFnd = usersArr.findIndex((user) => user.id === id);

    usersArr[userFnd].name = obj.name;
    usersArr[userFnd].email = obj.email;
    usersArr[userFnd].address.street = obj.street;
    usersArr[userFnd].address.city = obj.city;
    usersArr[userFnd].address.zipcode = obj.zipcode;

    //  console.log(usersArr[userFnd])
    setUsers(usersArr);
    setFndUsers(usersArr);
  };

  const userTodosAnPosts = (id) => {
    setUserId(id);
    setUserDivTodosTemplateOpen(true);

    let usersArr = [...users];
    let user = usersArr.find((el) => el.id === id);
    setUserObj(user);

    return true;
  };

  const updateUserTodo = (todoId) => {
    let usersArr = [...users];

    let user = { ...userObj };
    let userTodos = [...user.todos];
    let userTodoFndIndex = userTodos.findIndex((todo) => todo.id === todoId);
    userTodos[userTodoFndIndex].completed = true;
    user.todos = [...userTodos];

    let usersArrFndIndex = usersArr.findIndex((el) => el.id === user.id);

    usersArr.splice(usersArrFndIndex, 1, user);

    setUsers(usersArr);
    setFndUsers(usersArr);

    setUserObj(user);
  };

  const openAddTodo = () => {
    setIsTodoList(false);
    setIsPostList(true);
  };

  const openAddPost = () => {
    setIsPostList(false);
    setIsTodoList(true);
  };

  const addNewTodo = (title) => {
    let usersArr = [...users];
    let userO = userObj;

    let newId = Math.random() * 100000 + 1;

    // let UserTodos = usersArr[usersArr.length-1].todos
    //let newId = UserTodos[UserTodos.length-1].id +1

    let newObj = {
      userId: userID,
      id: newId,
      title: title,
      completed: false,
    };

    let fndIndex = usersArr.findIndex((el) => el.id === userID);

    usersArr[fndIndex].todos.push(newObj);

    //userO.todos.push(newObj)

    setUsers(usersArr);

    setFndUsers(usersArr);
    setIsTodoList(true);
  };

  const addNewPost = (post) => {
    let usersArr = [...users];
    let userO = userObj;

    let newId = Math.random() * 100000 + 1;

    let newObj = {
      userId: userID,
      id: newId,
      title: post.title,
      body: post.body,
    };

    let fndIndex = usersArr.findIndex((el) => el.id === userID);

    usersArr[fndIndex].posts.push(newObj);

    // userO.posts.push(newObj)

    setUsers(usersArr);

    setFndUsers(usersArr);
    setIsPostList(true);
  };

  const openAddUserBox = () => {
    setIsAddUser(true);
    setUserDivTodosTemplateOpen(false);
    setIsTodoList(true);
    setIsPostList(true);
  };

  const addNewUser = (obj) => {
    let userArr = [...users];
    let userNewId = userArr[userArr.length - 1].id + 1;

    let newObj = {
      id: userNewId,
      name: obj.name,
      email: obj.email,
      address: {
        street: "",
        city: "",
        zipcode: "",
      },
      todos: [],
      posts: [],
    };

    userArr.push(newObj);
    console.log(userArr);
    setUsers([...users, newObj]);
    setFndUsers([...fndUsers, newObj]);
  };

  ///////////////////
  ////////////////////////
  //////////////////////////////
  ////////////////////////
  ////////////////////////////////
  ////////////////

  return (
    <div className="users-main">
      <div className="users-box">
        <label className="serc-lab"> Search </label>
        <input
          type="text"
          id="search"
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          className="serc-btn"
          type="button"
          value="Add"
          onClick={openAddUserBox}
        />

        {fndUsers.map((usr) => {
          return (
            <User
              key={usr.id}
              user={usr}
              complete={usr.todos.every((todo) => todo.completed)}
              deleteCallback={deleteUser}
              updateCallback={updateUser}
              openDivUserCallback={userTodosAnPosts}
              checked={selectedDiv === usr.id}
              onClick={() => {
                setSelectedDiv(usr.id);
              }}
            />
          );
        })}
      </div>

      {userDivTodosTemplateOpen    ? (
        <div className="user-tasks">
          {isTodoList ? (
            <div className="todos-list">
              <div className="todos-linn1">
                <div className="todos-temp-name"> Todos-User{userObj.id} </div>
                <div className="todos-temp-btn">
                  <input
                    className="todo-add-btn"
                    type="button"
                    value="Add"
                    onClick={openAddTodo}
                  />
                </div>
              </div>

              <div className="todos-box">
                {userObj.todos.map((todo) => {
                  return (
                    <UserTodo
                      key={todo.id}
                      todo={todo}
                      completeCallback={updateUserTodo}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <AddTodo
              userId={userID}
              callbackCancelTodo={() => setIsTodoList(true)}
              callbackAddTodo={addNewTodo}
            />
          )}
          {isPostList ? (
            <div className="post-list">
              <div className="posts-linn1">
                <div className="posts-temp-name"> Posts-User{userObj.id} </div>
                <div className="posts-temp-btn">
                  <input
                    className="poot-add-btn"
                    type="button"
                    value="Add"
                    onClick={openAddPost}
                  />
                </div>
              </div>

              <div className="posts-box">
                {userObj.posts.map((post) => {
                  return <UserPosts key={post.id} post={post} />;
                })}
              </div>
            </div>
          ) : (
            <AddPost
              userId={userID}
              callbackCancelPost={() => setIsPostList(true)}
              callbackAddPost={addNewPost}
            />
          )}
        </div>
      ) : isAddUser ? (
        <AddUser
          callbackCancelAddUser={() => setIsAddUser(false)}
          callbackAddUser={addNewUser}
        />
      ) : null}
    </div>
  );
}

export default Users;
