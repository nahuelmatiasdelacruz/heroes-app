import { fireEvent, render, screen } from "@testing-library/react";
import { Search } from "../../../src/heroes/pages";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom",()=>({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en <Search/>",()=>{
  test("Debe mostrarse correctamente con valores por defecto",()=>{
    const {container} = render(
      <MemoryRouter>
        <Search/>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
  test("Debe mostrar a Batman y el input con el valor del queryString",()=>{
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Search/>
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");

    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
  });
  test("Debe mostrar un error si no se encuentra el heroe",()=>{
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <Search/>
      </MemoryRouter>
    )
      const alert = screen.getByLabelText("alert-danger");
      expect(alert.style.display).toBe("");
  });
  test("Debe llamar el navigate a la pantalla nueva",()=>{
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Search/>
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input,{target: {name: "searchText", value: "superman"}});
    
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=superman`);
  })
});