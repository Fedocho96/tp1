import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./userLogic";

const main = async (
  action: string,
  id = "",
  newUser = {},
  updatedUser = {}
) => {
  let response;
  switch (action) {
    case "getUsers":
      response = await getUsers();
      break;
    case "getUserById":
      response = await getUserById(id);
      break;
    case "createUser":
      response = await createUser(newUser);
      break;
    case "updateUser":
      response = await updateUser(id, updatedUser);
      break;
    case "deleteUser":
      response = await deleteUser(id);
      break;
    default:
      response = { error: "Invalid action" };
  }
  console.log(`Response for ${action}:`, response);
};

//--------------------casos de prueba ------------------------------//
const testGetUsers = async () => {
  await main("getUsers");
};

const testGetUserById = async () => {
  const id = "68067fbeaa7c4c11690afb44";
  await main("getUserById", id);
};

const testCreateUser = async () => {
  const newUser = {
    name: "Jorge Test nuevo",
    age: 30,
    email: "jorgetest3@gmail.com",
    password: "123123",
  };
  await main("createUser", "", newUser);
};

const testUpdateUser = async () => {
  const id = "68067fbeaa7c4c11690afb44";
  const updatedUser = {
    name: "Jorge Actualizado",
    age: 31,
  };
  await main("updateUser", id, updatedUser);
};

const testDeleteUser = async () => {
  const id = "68067fbeaa7c4c11690afb44";
  await main("deleteUser", id);
};

//-------------------//-------------------//
//Ejecutar todos los tests

// const runAllTests = async () => {
//await testGetUsers();
//await testGetUserById();
//await testCreateUser();
//await testUpdateUser();
//await testDeleteUser();
//};

//runAllTests();
//-------------------//-------------------//
