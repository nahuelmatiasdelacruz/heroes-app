import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Pruebas en <PublicRoute>",()=>{

  test("Debe mostrar el children si no está autenticado",()=>{
    const contextValue = {
      logged: false
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta pública</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Ruta pública")).toBeTruthy();
    // screen.debug();
  });
  test("Debe mostrar el navigate en caso de que esté autenticado: ",()=>{
    const contextValue = {
      logged: true,
      user: {
        name: "Nahuel",
        id: "223"
      }
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <Routes>
            <Route path="/login" element={<h1>Página de login</h1>}/>
            <Route path="/marvel" element={<h1>Página Marvel</h1>}/>
          </Routes>
          <PublicRoute>
            <h1>Ruta pública</h1>
          </PublicRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Página Marvel")).toBeTruthy();
  })

})