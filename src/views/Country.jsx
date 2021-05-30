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
import axios from "axios";

const url = {
  get: "https://api-fake-pilar-tecno.herokuapp.com/countries",
  post: "https://api-fake-pilar-tecno.herokuapp.com/countries",
  delete: "https://api-fake-pilar-tecno.herokuapp.com/countries/1",
};
const countries = [
  
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
        // id: "",
        name: "",
      },
      error: {},
    };
  }
  componentDidMount() {
    axios
      .get(url.get)
      .then((response) => {
        console.log(response);
        this.setState({ dataCountry: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
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
      },
    });
  };

  edit = (datum) => {
    var valid = true;
    let error = {};
    var counter = 0;

    if (this.state.form.name.trim() === "") {
      valid = false;
      error.name = window.confirm("Por Favor, ingresar un valor en campo Pais");
      return;
    }
    this.setState({
      error: error,
    });
    if (valid === true) {
      window.confirm("Se Modifico con Exito el Registro");
      var fix = this.state.dataCountry;
      fix.forEach((register) => {
        if (datum.id === register.id) {
          fix[counter].name = datum.name;
        }
        counter++;
      });
      this.setState({
        dataCountry: fix,
        modalEdit: false,
        form: { id: "", name: "" },
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
    }
  };

  insert = (e) => {
    // var newValue = { ...this.state.form };
    // newValue.id = this.state.dataCountry.length+1;
    var list = this.state.dataCountry;
    let error = {};
    var valid = true;

    if (this.state.form.name.trim() === "") {
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
      // list.push(newValue);
      axios
      .post(url.post, this.state.form)
      .then((response) => {
        console.log(response);
        list.push(response.data);
        this.setState({ dataCountry: list });
      })
      .catch((error) => {
        console.log(error);
      });
      this.setState({
        modalInsert: false,
        dataCountry: list,
        form: {
          id: "",
          name: "",
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
                  <td>{datum.name}</td>

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
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
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
                name="name"
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
