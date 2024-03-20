import { authReducer,types } from "../../../src/auth"

describe("Pruebas en el authReducer",()=>{

  test("Debe retornar el estado por defecto",()=>{
    const state = authReducer({logged: false},{});
    expect(state).toEqual({logged: false});
  });
  test("Debe llamar el login y autenticar el usuario",()=>{
    const action = {
      type: types.login,
      payload: {
        name: "Nahuel",
        id: "123",
      }
    }
    const state = authReducer({logged: false},action);
    expect(state).toEqual({logged: true, user: action.payload});
  });
  test("Debe borrar el name del usuario y logged en false",()=>{
    const state = {
      logged: true,
      user: {
        name: "Nahuel",
        id: "123"
      }
    };
    const action = {
      type: types.logout
    }
    const newState = authReducer(state,action);
    expect(newState).toEqual({logged: false});
  })

});