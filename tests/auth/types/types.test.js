import { types } from "../../../src/auth"

describe("Pruebas en 'types.js'",()=>{
  test("Debe regresar estos types:",()=>{
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout"
    });
  })
})