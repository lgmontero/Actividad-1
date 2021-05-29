import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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

const cities = [
  {
    id: 1,
    city: "La Rioja",
    country: "Argentina",
  },
  {
    id: 2,
    city: "Santiago",
    country: "Chile",
  },
  {
    id: 3,
    city: "Natal",
    country: "Brasil",
  },
];

export class City extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      dataCity: cities,
      modalEdit: false,
      modalInsert: false,
      form: {
        id: "",
        city: "",
        country: "",
      },
      error: {},
      countries: [],
    };
  }
  componentDidMount() {
    if (localStorage.getItem("datacountry") != null) {
      this.setState({
        countries: JSON.parse(localStorage.getItem("datacountry")),
      });
    }
    if (localStorage.getItem("datacity") != null) {
      this.setState({
        dataCity: JSON.parse(localStorage.getItem("datacity")),
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
        city: "",
        country: "",
      },
    });
  };

  edit = (datum) => {
    var valid = true;
    let error = {};
    var counter = 0;

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
      var fix = this.state.dataCity;
      fix.forEach((register) => {
        if (datum.id === register.id) {
          fix[counter].city = datum.city;
          fix[counter].country = datum.country;
        }
        counter++;
      });
      this.setState({
        dataCity: fix,
        modalEdit: false,
        form: { id: "", city: "", country: "" },
      });
      localStorage.setItem("datacity", JSON.stringify(this.state.dataCity));
    }
  };

  remove = (datum) => {
    var option = window.confirm(
      "Estás Seguro que deseas Eliminar este Registro "
    );
    if (option === true) {
      var counter = 0;
      var fix = this.state.dataCity;
      fix.forEach((register) => {
        if (datum.id === register.id) {
          fix.splice(counter, 1);
        }
        counter++;
      });
      this.setState({ dataCity: fix, modalActualizar: false });
      localStorage.setItem("datacity", JSON.stringify(this.state.dataCity));
    }
  };

  insert = (e) => {
    var newValue = { ...this.state.form };
    newValue.id = this.state.dataCity.length + 1;
    var list = this.state.dataCity;
    let error = {};
    var valid = true;

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
      window.confirm("El Reistro se Guardo con Exito!!");
      list.push(newValue);
      localStorage.setItem("datacity", JSON.stringify(this.state.dataCity));
      this.setState({
        modalInsert: false,
        dataCity: list,
        form: {
          id: "",
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
    return (
      <>
        <Container>
          <br />
          <thead>
            <h1>Registro de Ciudades</h1>
          </thead>
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
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
              {this.state.dataCity.map((datum) => (
                <tr key={datum.id}>
                  <td>{datum.id}</td>
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
              <label class="a">
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
              <label class="a">Ciudad:</label>
              <input
                className="form-control"
                name="city"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.city}
              />
            </FormGroup>

            <FormGroup>
              <label class="a">Pais:</label>
              <input
                className="form-control"
                name="country"
                readOnly
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
              <h3>Registro de Ciudades</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            {/* <FormGroup>
              <label class="a">
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.dataCity.length+1}
              />
            </FormGroup> */}

            <FormGroup>
              <label class="a">Ciudad:</label>
              <input
                className="form-control"
                name="city"
                type="text"
                placeholder="Ingresar el Nombre de la Ciudad"
                required
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label className="a">Pais</label>

              <select
                className="form-control"
                name="country"
                placeholder="Ingresar el Nombre del Pais"
                required
                value={JSON.stringify(this.state.country)}
                onChange={this.handleOptions}
              >
                <option disabled selected hidden>
                Seleccione el Pais
                </option>

                {this.state.countries.map(({ country, id }) => (
                  <option Key={id + 1} value={JSON.stringify(country)}>
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
