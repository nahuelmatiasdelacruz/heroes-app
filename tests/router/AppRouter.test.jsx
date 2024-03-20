import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AppRouter } from "../../src/router"
import { AuthContext } from "../../src/auth"

describe('Pruebas en <AppRouter/>', () => {
  test("Debe mostrar el login en caso de no estar autenticado",()=>{
    const contextValue = {
      logged: false
    }
    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter/>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Login").length).toBe(2);
  });
  test("Debe mostrar el componente marvel si está autenticado",()=>{
    const contextValue = {
      logged: true,
      user: {
        name: "Nahuel",
        id: "223"
      }
    }
    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter/>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
  })
})