const { render, screen, fireEvent } = require("@testing-library/react");
const { AuthContext } = require("../../../src/auth");
const { Navbar } = require("../../../src/ui");
const { MemoryRouter, useNavigate } = require("react-router-dom");

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom",()=>({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}))

describe("Pruebas en <NavBar>",()=>{
  const contextValue = {
    logged: true,
    user: {
      name: "Nahuel",
      id: "223"
    },
    logout: jest.fn()
  }
  beforeEach(()=>{jest.clearAllMocks()});
  test("Debe mostrar el nombre del usuario",()=>{
    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar/>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(contextValue.user.name)).toBeTruthy();
  });
  test("Debe pasar si se presionó el boton de logout",()=>{
    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar/>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const logoutBtn = screen.getByRole("button");
    fireEvent.click(logoutBtn);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login",{replace: true});

  })
});