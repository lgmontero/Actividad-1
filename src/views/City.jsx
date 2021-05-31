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
  get: "https://api-fake-pilar-tecno.herokuapp.com/places?_expand=countrie",
  getcountries: "https://api-fake-pilar-tecno.herokuapp.com/countries",
  post: "https://api-fake-pilar-tecno.herokuapp.com/places",
  delete: (id) => `https://api-fake-pilar-tecno.herokuapp.com/places/${id}`,
  edit: (id)=>`https://api-fake-pilar-tecno.herokuapp.com/places/${id}`,
};
const cities = [];

export class City extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      dataCity: cities,
      modalEdit: false,
      modalInsert: false,
      form: {
        name: "",
        countrieId: "",
        
      },
      error: {},
      countries: [],
    };
  }
  componentDidMount() {
    axios
      .get(url.get)
      .then((response) => {
        console.log(response);
        this.setState({ dataCity: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(url.getcountries)
      .then((response) => {
        console.log(response);
        this.setState({ countries: response.data });
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
       countrieId: "",
        name: "",
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
        countrieId: "",
        name: "",
      },
    });
  };

  edit = (datum) => {
    var valid = true;
    let error = {};
   

    if (this.state.form.countrieId === null || this.state.form.countrieId === undefined) {
      valid = false;
      error.countrieId = window.confirm(
        "Por Favor, ingresar un valor en campo Ciudad"
      );
      return;
    }
    if (this.state.form.name.trim() === "") {
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
      axios
      .patch(url.edit(datum.id),{name:this.state.form.name})
      .then((response) => {
        let auxState = this.state.dataCity;
        let currIndex = this.state.dataCity.findIndex((city) => city.id === datum.id);
        let country = this.state.countries.find((city)=>{
         return city.id === this.state.form.countrieId
        })
        let city = {
          name: response.data.name,
          countrieId: this.state.form.countrieId,
          id: response.data.id,
          countrie: country

        }
        auxState[currIndex]=city
        this.setState({ dataCity: auxState, modalEdit: false, form: {  name: "", countrieId:"",}, });
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
          let newfix = this.state.dataCity.filter(
            (city) => city.id !== datum.id
          );
          console.log(response);

          this.setState({ dataCity: newfix, modalEdit: false });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  insert = (e) => {
    var list = this.state.dataCity;
    let error = {};
    var valid = true;

    if (this.state.form.countrieId === null || this.state.form.countrieId === undefined ) {
      valid = false;
      error.countrieId = window.confirm(
        "Por Favor, ingresar un valor en campo Ciudad"
      );

      return;
    }
    if (this.state.form.name.trim() === "") {
      valid = false;
      error.name = window.confirm(
        "Por Favor, ingresar un valor en campo Pais"
      );

      return;
    }
    this.setState({
      error: error,
    });

    if (valid === true) {
      window.confirm("El Reistro se Guardo con Exito!!");
      axios
        .post(url.post, this.state.form)
        .then((response) => {
          console.log(response);
          let country = this.state.countries.find((city)=>{
            return city.id === this.state.form.countrieId
          })
          let city = {
            name: this.state.form.name,
            countrieId: this.state.form.countrieId,
            id: response.data.id,
            countrie: country

          }
          list.push(city);
         
          this.setState({ dataCity: list });
          this.setState({
            modalInsert: false,
            dataCity: list,
            form: {
              countrieId: "",
              name: "",
            },
          });

        })
        .catch((error) => {
          console.log(error);
        });
     
    }
  };

  handleChange = (e) => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value},
    });
  };

  handleOptions = (e) => {
    e.preventDefault();
        this.setState({
      form: { ...this.state.form, [e.target.name]: JSON.parse(e.target.value)}
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
                  <td>{datum.name}</td>
                  <td>{datum.countrie.name}</td>

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
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
              />
            </FormGroup>

            <FormGroup>
              <label class="a">Pais:</label>
              <input
                className="form-control"
                name="countrieId"
                readOnly
                type="text"
                onChange={this.handleChange}
                value={this.state.form.countrieId}
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
                name="name"
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
                name="countrieId"
                placeholder="Ingresar el Nombre del Pais"
                required
                value={JSON.stringify(this.state.countrieId)}
                onChange={this.handleOptions}
              >
                <option value={JSON.stringify({})}  disabled selected hidden>
                Seleccione el Pais
                </option>

                {this.state.countries.map(({ name, id }) => (
                  <option key={id} value={JSON.stringify(id)}>
                    {name}
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
