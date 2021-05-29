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

const countries = [
  {
    id: 1,
    country: "Argentina",
  },
  {
    id: 2,
    country: "Chile",
  },
  {
    id: 3,
    country: "Brasil",
  },
];

export class Country extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      dataCountry: countries,
      modalEdit: false,
      modalInsert: false,
      form: {
        id: "",
        country: "",
      },
      error: {},
    };
  }
  componentDidMount() {
    if (localStorage.getItem("datacountry") != null) {
      this.setState({
        dataCountry: JSON.parse(localStorage.getItem("datacountry")),
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
        country: "",
      },
    });
  };

  edit = (datum) => {
    var valid = true;
    let error = {};
    var counter = 0;

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
      var fix = this.state.dataCountry;
      fix.forEach((registro) => {
        if (datum.id === registro.id) {
          fix[counter].country = datum.country;
        }
        counter++;
      });
      this.setState({
        dataCountry: fix,
        modalEdit: false,
        form: { id: "", country: "" },
      });
      localStorage.setItem(
        "datacountry",
        JSON.stringify(this.state.dataCountry)
      );
    }
  };

  remove = (datum) => {
    var option = window.confirm(
      "Estás Seguro que deseas Eliminar este Registro "
    );
    if (option === true) {
      var counter = 0;
      var fix = this.state.dataCountry;
      fix.forEach((register) => {
        if (datum.id === register.id) {
          fix.splice(counter, 1);
        }
        counter++;
      });
      this.setState({ dataCountry: fix, modalEdit: false });
      localStorage.setItem(
        "datacountry",
        JSON.stringify(this.state.dataCountry)
      );
    }
  };

  insert = (e) => {
    var newValue = { ...this.state.form };
    newValue.id = this.state.dataCountry.length + 1;
    var list = this.state.dataCountry;
    let error = {};
    var valid = true;

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
      localStorage.setItem(
        "datacountry",
        JSON.stringify(this.state.dataCountry)
      );

      this.setState({
        modalInsert: false,
        dataCountry: list,
        form: {
          id: "",
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

  render() {
    return (
      <>
        <Container>
          <br />
          <thead>
            <h1>Registro de Paises</h1>
          </thead>
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
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
              {this.state.dataCountry.map((datum) => (
                <tr key={datum.id}>
                  <td>{datum.id}</td>
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
              <label className="a">Pais:</label>
              <input
                className="form-control"
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
              <h3>Registro de Paises</h3>
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
                value={this.state.dataCountry.length+1}
              />
            </FormGroup> */}

            <FormGroup>
              <label className="a">Pais:</label>
              <input
                className="form-control"
                name="country"
                type="text"
                placeholder="Ingresar el Nombre del Pais"
                required
                onChange={this.handleChange}
              />
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
