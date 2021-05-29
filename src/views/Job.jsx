import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { companies } from "../utils/Functions";
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

const jobs = [
  {
    id: 1,
    workstation: "Especialista en Soporte",
    company: "Develop SA",
    city: "La Rioja",
    country: "Argentina",
  },
  {
    id: 2,
    workstation: "Asesor Comercial",
    company: "Sancor SA",
    city: "Cordoba",
    country: "Argentina",
  },
  {
    id: 3,
    workstation: "Especialistas en Datos",
    company: "Sancor SA",
    city: "Cordoba",
    country: "Argentina",
  },
];

export class Job extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      dataJobs: jobs,
      modalEdit: false,
      modalInsert: false,
      form: {
        id: "",
        workstation: "",
        company: "",
        city: "",
        country: "",
      },
      error: {},
      companies: [],
    };
  }
  componentDidMount() {
    if (localStorage.getItem("datacompany") != null) {
      this.setState({
        companies: JSON.parse(localStorage.getItem("datacompany")),
      });
    }
    if (localStorage.getItem("datajob") != null) {
      this.setState({
        dataJobs: JSON.parse(localStorage.getItem("datajob")),
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
      form: {
        id: "",
        name: "",
        workstation: "",
        company: "",
        city: "",
        country: "",
      },
      modalEdit: false,
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
        name: "",
        workstation: "",
        company: "",
        city: "",
        country: "",
      },
    });
  };

  edit = (datum) => {
    var valid = true;
    let error = {};
    var counter = 0;

    if (this.state.form.workstation.trim() === "") {
      valid = false;
      error.workstation = window.confirm(
        "Por Favor, Ingresar un valor en campo Función"
      );
      return;
    }
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
      var fix = this.state.dataJobs;
      fix.forEach((register) => {
        if (datum.id === register.id) {
          fix[counter].workstation = datum.workstation;
          fix[counter].company = datum.company;
          fix[counter].city = datum.city;
          fix[counter].country = datum.country;
        }
        counter++;
      });
      this.setState({
        dataJobs: fix,
        modalEdit: false,
        form: {
          id: "",
          workstation: "",
          company: "",
          city: "",
          country: "",
        },
      });
      localStorage.setItem("datajob", JSON.stringify(this.state.dataJobs));
    }
  };

  remove = (datum) => {
    var option = window.confirm(
      "Estás Seguro que deseas Eliminar este Registro "
    );
    if (option === true) {
      var counter = 0;
      var fix = this.state.dataJobs;
      fix.forEach((register) => {
        if (datum.id === register.id) {
          fix.splice(counter, 1);
        }
        counter++;
      });
      this.setState({ dataJobs: fix, modalEdit: false });
      localStorage.setItem("datajob", JSON.stringify(this.state.dataJobs));
    }
  };

  insert = (e) => {
    var newValue = { ...this.state.form };
    newValue.id = this.state.dataJobs.length + 1;
    var list = this.state.dataJobs;
    let error = {};
    var valid = true;

    if (this.state.form.workstation.trim() === "") {
      valid = false;
      error.workstation = window.confirm(
        "Por Favor, Ingrese la descripsion que se desepeña en el campo Función"
      );

      return;
    }
    if (this.state.form.company.trim() === "") {
      valid = false;
      error.workstation = window.confirm(
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
      window.confirm("El Registro se Guardo con Exito!!");
      list.push(newValue);
      localStorage.setItem("datajob", JSON.stringify(this.state.dataJobs));
      this.setState({
        modalInsert: false,
        dataJobs: list,
        form: {
          id: "",
          workstation: "",
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
  handleOptions = (e) => {
    e.preventDefault();
    this.setState({
      form: { ...this.state.form, [e.target.name]: JSON.parse(e.target.value) },
    });
  };

  render() {
    let deleteRepeated = companies(this.state.companies);

    return (
      <>
        <Container>
          <br />
          <thead>
            <h1>Registro de Puestos Laborales</h1>
          </thead>
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Función | Puesto</th>
                <th>Empresa</th>
                <th>Ciudad</th>
                <th>Pais</th>
                <th>Acción</th>

                
                <th>
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
              {this.state.dataJobs.map((datum) => (
                <tr key={datum.id}>
                  <td>{datum.id}</td>
                  <td>{datum.workstation}</td>
                  <td>{datum.company}</td>
                  <td>{datum.city}</td>
                  <td>{datum.country}</td>

                  <td>
                    
                    <Button
                      color="btn btn-primary btn-sm"
                      onClick={() => this.openModalEdit(datum)}
                      className="btn-marg"
                    >
                      Editar
                    </Button>
                    <Button
                      color="btn btn-danger btn-sm"
                      onClick={() => this.remove(datum)}
                      className="btn-marg"
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
              <label className="a">Función | Puesto</label>
              <input
                className="form-control"
                name="workstation"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.workstation}
              />
            </FormGroup>

            <FormGroup>
              <label className="a">Empresa</label>
              <input
                className="form-control"
                readOnly
                name="company"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.company}
              />
            </FormGroup>

            <FormGroup>
              <label className="a">Ciudad</label>
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
              <label className="a">Pais</label>
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
              <h3>Registro de Puestos | Funciones</h3>
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
                value={this.state.dataJobs.length+1}
              />
            </FormGroup> */}

            <FormGroup>
              <label className="a" htmlFor="workstation">
                Función | Puesto
              </label>
              <input
                className="form-control"
                name="workstation"
                required
                id="workstation"
                placeholder="Ingresar el puesto en el que se desempeña"
                type="text"
                onChange={this.handleChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <label className="a" htmlFor="company">
                Empresa
              </label>
              <select
                className="form-control"
                name="company"
                id="company"
                type="text"
                placeholder="Ingresar el Nombre de la Empresa"
                required
                value={JSON.stringify(this.state.company)}
                onChange={this.handleOptions}
              >
                <option value={JSON.stringify({})} disabled selected hidden>
                  Seleccione la Empresa
                </option>
                {deleteRepeated.map((company, id) => (
                  <option Key={id + 1} value={JSON.stringify(company)}>
                    {company}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup>
              <label className="a">Ciudad</label>
              <select
                className="form-control"
                name="city"
                type="text"
                required
                value={JSON.stringify(this.state.city)}
                onChange={this.handleOptions}
              >
                <option value={JSON.stringify({})} disabled selected hidden>
                  Seleccione la Ciudad
                </option>

                 {[
                  ...new Set(
                    this.state.companies
                      .filter(
                        (elements) => elements.company === this.state.form.company
                      )
                      .map((company) => company.city)
                  ),
                ].map((city, index) => (
                  <option Key={index} value={JSON.stringify(city)}>
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
                onChange={this.handleOptions}
              >
                <option value={JSON.stringify({})} disabled selected hidden>
                  Seleccione el Pais
                </option>

                {[
                  ...new Set(
                    this.state.companies
                      .filter(
                        (elements) => elements.city === this.state.form.city
                      )
                      .map((company) => company.country)
                  ),
                ].map((country, index) => (
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
