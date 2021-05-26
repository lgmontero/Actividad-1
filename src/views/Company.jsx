import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { cities } from "../utils/Functions";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const companies = [
  {
    id: 1,
    company: "Develop SA",
    city: "La Rioja",
    country: "Argentina",
  },
  {
    id: 2,
    company: "Chilevisión",
    city: "Santiago",
    country: "Chile",
  },
  {
    id: 3,
    company: "Petrobras",
    city: "Natal",
    country: "Brasil",
  },
];

export class Company extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      dataCompany: companies,
      modalEdit: false,
      modalInsert: false,
      form: {
        id: "",
        company: "",
        city: "",
        country: "",
      },
      error: {},
      cities: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem("datacity") != null) {
      this.setState({
        cities: JSON.parse(localStorage.getItem("datacity")),
      });
    }
    if (localStorage.getItem("datacompany") != null) {
      this.setState({
        dataCompany: JSON.parse(localStorage.getItem("datacompany")),
      });
    }
  }

  openModalEdit = (datum) => {
    this.setState({
      form: datum,
      modalEdit: true,
    });
  };

  closeModalEdit = () => {
    this.setState({
      modalEdit: false,
      form: {
        id: "",
        company: "",
        city: "",
        country: "",
      },
      
    });
  };

  showModalInsert = () => {
    this.setState({
      modalInsert: true,
    });
  };

  closeModalInsert = () => {
    this.setState({
      modalInsert: false,
      form: {
        id: "",
        company: "",
        city: "",
        country: "",
      },
    });
  };

  edit = (datum) => {
    var valid = true;
    let error = {};
    var contador = 0;

    if (this.state.form.company.trim() === "") {
      valid = false;
      error.company = window.confirm(
        "Por Favor, Ingresar un valor en campo Empresa"
      );
      return;
    }
    if (this.state.form.city.trim() === "") {
      valid = false;
      error.city = window.confirm(
        "Por Favor, ingresar un valor en campo Ciudad"
      );
      return;
    }
    if (this.state.form.country.trim() === "") {
      valid = false;
      error.conutry = window.confirm(
        "Por Favor, ingresar un valor en campo Pais"
      );
      return;
    }
    this.setState({
      error: error,
    });
    if (valid === true) {
      window.confirm("Se Modifico con Exito el Registro");
      var fix = this.state.dataCompany;
      fix.forEach((register) => {
        if (datum.id === register.id) {
          fix[contador].company = datum.company;
          fix[contador].city = datum.city;
          fix[contador].country = datum.country;
        }
        contador++;
      });
      this.setState({
        dataCompany: fix,
        modalEdit: false,
        form: { id: "", company: "", city: "", country: "" },
      });
      localStorage.setItem("datacompany", JSON.stringify(this.state.dataCompany));
    }
  };

  remove = (datum) => {
    var option = window.confirm(
      "Estás Seguro que deseas Eliminar este Registro "
    );
    if (option === true) {
      var contador = 0;
      var fix = this.state.dataCompany;
      fix.forEach((register) => {
        if (datum.id === register.id) {
          fix.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ dataCompany: fix, modalEdit: false });
      localStorage.setItem("datacompany", JSON.stringify(this.state.dataCompany));
    }
  };

  insert = (e) => {
    var newValue = { ...this.state.form };
    newValue.id = this.state.dataCompany.length + 1;
    var list = this.state.dataCompany;
    let error = {};
    var valid = true;

    if (this.state.form.company.trim() === "") {
      valid = false;
      error.funcion = window.confirm(
        "Por Favor, Ingrese en nombre de su Empresa"
      );

      return;
    }
    if (this.state.form.city.trim() === "") {
      valid = false;
      error.city = window.confirm(
        "Por Favor, ingresar un valor en campo Ciudad"
      );

      return;
    }
    if (this.state.form.country.trim() === "") {
      valid = false;
      error.country = window.confirm(
        "Por Favor, ingresar un valor en campo Pais"
      );

      return;
    }
    this.setState({
      error: error,
    });

    if (valid === true) {
      window.confirm("El registro se Guardo con Exito!!");
      list.push(newValue);
      localStorage.setItem("datacompany", JSON.stringify(this.state.dataCompany));
      this.setState({
        modalInsert: false,
        dataCompany: list,
        form: {
          id: "",
          company: "",
          city: "",
          country: "",
        },
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  };

  handleCities = (e) => {
    e.preventDefault();
    this.setState({
      form: { ...this.state.form, [e.target.name]: JSON.parse(e.target.value) },
    });
  };

  render() {
    // let listapais = paises(this.state.cities);
    let deleteRepeated = cities(this.state.cities);
    return (
      <>
        <Container>
          <br />
          <thead>
            <h1>Registro de Empresas</h1>
          </thead>
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Empresa</th>
                <th>Ciudad</th>
                <th>Pais</th>
                <th>Acción</th>

                <th>
                  {" "}
                  <Button
                    color="btn btn-success btn-sm"
                    onClick={() => this.showModalInsert()}
                  >
                    Registrar
                  </Button>
                </th>
              </tr>
            </thead>

            <tbody>
              {this.state.dataCompany.map((datum) => (
                <tr key={datum.id}>
                  <td>{datum.id}</td>
                  <td>{datum.company}</td>
                  <td>{datum.city}</td>
                  <td>{datum.country}</td>

                  <td>
                    {" "}
                    <Button
                      color="btn btn-primary btn-sm"
                      onClick={() => this.openModalEdit(datum)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      color="btn btn-danger btn-sm"
                      onClick={() => this.remove(datum)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalEdit}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            {/* <FormGroup >
              <label className="a">
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup> */}

            <FormGroup>
              <label className="a">Empresa</label>
              <input
                className="form-control"
                name="company"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.company}
              />
            </FormGroup>

            <FormGroup>
              <label className="a">Ciudad:</label>
              <input
                className="form-control"
                readOnly
                name="city"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.city}
              />
            </FormGroup>

            <FormGroup>
              <label className="a">Pais:</label>
              <input
                className="form-control"
                readOnly
                name="country"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.country}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="btn btn-warning btn-sm"
              onClick={() => this.edit(this.state.form)}
            >
              Modificar
            </Button>
            <Button
              color="btn btn-secondary btn-sm"
              onClick={() => this.closeModalEdit()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader>
            <div>
              <h3>Registro de Empresas</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            {/* <FormGroup>
              <label className="a">
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.dataCompany.length+1}
              />
            </FormGroup> */}

            <FormGroup>
              <label className="a">Empresa</label>
              <input
                className="form-control"
                name="company"
                type="text"
                placeholder="Ingresar el Nombre de la Empresa"
                required
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label className="a">Ciudad</label>
              <select
                className="form-control"
                name="city"
                type="text"
                required
                value={JSON.stringify(this.state.city)}
                onChange={this.handleCities}
              >
                <option value={JSON.stringify({})} disabled selected hidden>
                  Seleccione la Ciudad
                </option>
                {deleteRepeated.map((city, id) => (
                  <option Key={id + 1} value={JSON.stringify(city)}>
                    {city}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label className="a">Pais</label>

              <select
                className="form-control"
                name="country"
                
                required
                value={JSON.stringify(this.state.country)}
                onChange={this.handleCities}
              >
                <option value={JSON.stringify({})} disabled selected hidden>
                  Seleccione el Pais
                </option>

                {this.state.cities
                  .filter(
                    (element) =>
                      element.city === this.state.form.city
                  )
                  .map(({ country, index }) => (
                    <option Key={index} value={JSON.stringify(country)}>
                      {country}
                    </option>
                  ))}
              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="btn btn-warning btn-sm"
              onClick={() => this.insert()}
            >
              Guardar
            </Button>
            <Button
              color="btn btn-secondary btn-sm"
              onClick={() => this.closeModalInsert()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
