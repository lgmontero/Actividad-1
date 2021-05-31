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
import axios from "axios";

const url = {
  get: "http://api-fake-pilar-tecno.herokuapp.com/organizations?_expand=place",
  getcities: "https://api-fake-pilar-tecno.herokuapp.com/places?_expand=countrie",
  post: "https://api-fake-pilar-tecno.herokuapp.com/organizations",
  delete: (id) => `https://api-fake-pilar-tecno.herokuapp.com/organizations/${id}`,
  edit: (id)=>`https://api-fake-pilar-tecno.herokuapp.com/organizations/${id}`,
};

const companies = [
  
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
       placeId: "",
        name: "",
        countrieId:"",
        place:{name:"",countrieId: "",}
      },
      error: {},
      cities: [],
    };
  }

  componentDidMount() {
    axios
      .get(url.get)
      .then((response) => {
        console.log(response);
        this.setState({ dataCompany: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(url.getcities)
      .then((response) => {
        console.log(response);
        this.setState({ cities: response.data });
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
      modalEdit: false,
      form: {
        placeId: "",
        name: "",
        countrieId:"",
        place:{name:"",countrieId: "",}
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
        placeId: "",
        name: "",
        countrieId:"",
      },
    });
  };

  edit = (datum) => {
    var valid = true;
    let error = {};
    if (this.state.form.name.trim() === "") {
      valid = false;
      error.company = window.confirm("Por Favor, Ingresar un valor en campo Empresa");
      return;
    }
    this.setState({ error: error,});
    if (valid === true) {
      window.confirm("Se Modifico con Exito el Registro");
      axios
      .patch(url.edit(datum.id),{name:this.state.form.name})
      .then((response) => {
        let auxState = this.state.dataCompany;
        let currIndex = this.state.dataCompany.findIndex((company) => company.id === datum.id);
        
        auxState[currIndex].name=response.data.name
        this.setState({ dataCompany: auxState, modalEdit: false, form: { placeId: "", name: "", countrieId:"",   place:{name:"",countrieId: "",} },});
      })
      .catch((error) => {
        console.log(error);
      });


    }
  };

  remove = (datum) => {
    var option = window.confirm(
      "Estás Seguro que deseas Eliminar este Registro "
    );
    if (option === true) {
      axios
        .delete(url.delete(datum.id))
        .then((response) => {
          let newfix = this.state.data.filter(
            (city) => city.id !== datum.id
          );
          console.log(response);

          this.setState({ data: newfix, modalEdit: false });
        })
        .catch((error) => {
          console.log(error);
        });
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
          placeId: "",
          name: "",
          countrieId:"",
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
     let cityData = JSON.parse(e.target.value)
  

    this.setState({
      form: { ...this.state.form, placeId: cityData.name, countrieId: cityData.countrie.name },
    });
  };

  render() {
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
                  
                  <Button
                    color="btn btn-success btn-sm"
                    onClick={() => this.showModalInsert()}
                    className="btn-marg"
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
                  <td>{datum.name}</td>
                  <td>{typeof datum.place !== "undefined" ? datum.place.name : "Sin Datos"}</td>
                  <td>{typeof datum.place !== "undefined" ? datum.place.countrieId: "Sin Datos"}</td>

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
              <label className="a">Empresa</label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
              />
            </FormGroup>

            <FormGroup>
              <label className="a">Ciudad:</label>
              <input
                className="form-control"
                readOnly
                name="name"
                type="text"
                // onChange={this.handleChange}
                value={this.state.form.place.name}
              />
            </FormGroup>

            <FormGroup>
              <label className="a">Pais:</label>
              <input
                className="form-control"
                readOnly
                name="countrieId"
                type="text"
                // onChange={this.handleChange}
                value={this.state.form.place.countrieId}
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
                name="name"
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
                name="placeId"
                type="text"
                required
                value={JSON.stringify(this.state.placeId)}
                onChange={this.handleOptions}
              >
                <option value={JSON.stringify({})} disabled selected hidden>
                  Seleccione la Ciudad y el Pais
                </option>
                {deleteRepeated.map((city, id) => (
                  <option key={id } value={JSON.stringify(city)}>
                    {city.name} - {city.countrie.name}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label className="a">Pais</label>

              <select
                className="form-control"
                name="countrieId"
                required
                value={JSON.stringify(this.state.countrieId)}
                onChange={this.handleOptions}
              >
                <option value={JSON.stringify({})} disabled selected hidden>
                  Seleccione el Pais
                </option>

                {this.state.cities
                  .filter(
                    (element) =>
                      element.countrie.name === this.state.form.name
                  )
                  .map(({ countrie, index }) => (
                    <option key={index} value={JSON.stringify(countrie.id)}>
                      {countrie.name}
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
