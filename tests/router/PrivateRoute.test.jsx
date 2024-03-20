import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../src/router";
import { AuthContext } from "../../src/auth";

describe('Pruebas en el <PrivateRoute>', () => { 
  test("Debe mostrar el children si está autenticado",()=>{
    Storage.prototype.setItem = jest.fn();
    const contextValue = {
      logged: true,
      user: {
        name: "Nahuel",
        id: "223"
      }
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search?q=batman"]}>
          <PrivateRoute>
            <h1>Ruta privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Ruta privada")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath","/search?q=batman");
  });
})