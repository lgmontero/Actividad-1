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

const data = [
  {
    id: 1,
    name: "Pedro Carrizo",
    funcion: "Empleado",
    empresa: "Develop SA",
    city: "La Rioja",
    country: "Argentina",
  },
  {
    id: 2,
    name: "Gonzalo Gonzalez",
    funcion: "Empleado",
    empresa: "Sancor SA",
    city: "Cordoba",
    country: "Argentina",
  },
];

export class Form extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      name: "",
      funcion: "",
      empresa: "",
      city: "",
      country: "",
    },
    error: {},
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({
      form: {
        id: "",
        name: "",
        funcion: "",
        empresa: "",
        city: "",
        country: "",
      },
      modalActualizar: false,
    });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var valida = true;
    let error = {};
    var contador = 0;

    if (this.state.form.name.trim() === "") {
      valida = false;
      error.name = window.confirm(
        "Por Favor, Ingresar un valor en campo Nombre y Apellido"
      );
      return;
    }
    if (this.state.form.funcion.trim() === "") {
      valida = false;
      error.funcion = window.confirm(
        "Por Favor, Ingresar un valor en campo Funcion"
      );
      return;
    }
    if (this.state.form.empresa.trim() === "") {
      valida = false;
      error.empresa = window.confirm(
        "Por Favor, Ingresar un valor en campo Empresa"
      );
      return;
    }
    if (this.state.form.city.trim() === "") {
      valida = false;
      error.city = window.confirm(
        "Por Favor, ingresar un valor en campo Ciudad"
      );
      return;
    }
    if (this.state.form.country.trim() === "") {
      valida = false;
      error.conutry = window.confirm(
        "Por Favor, ingresar un valor en campo Pais"
      );
      return;
    }
    this.setState({
      error: error,
    });
    if (valida === true) {
      window.confirm("Se Modifico con Exito el Registro");
      var arreglo = this.state.data;
      arreglo.forEach((registro) => {
        if (dato.id === registro.id) {
          arreglo[contador].name = dato.name;
          arreglo[contador].funcion = dato.funcion;
          arreglo[contador].empresa = dato.empresa;
          arreglo[contador].city = dato.city;
          arreglo[contador].country = dato.country;
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false,
        form: { id: "", name: "", funcion: "", empresa: "",  city: "", country: "", },
      });
    }
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar este Registro "
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.forEach((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = (e) => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    let error = {};
    var valida = true;

    if (this.state.form.name.trim() === "") {
      valida = false;
      error.name = window.confirm(
        "Por Favor, Ingresar un valor en campo Nombre y Apellido"
      );
      
        return;
      
    }
    if (this.state.form.funcion.trim() === "") {
      valida = false;
      error.funcion = window.confirm(
        "Por Favor, Ingrese la descripsion que se desepeña en el campo Función"
      );
      
        return;
      
    }
    if (this.state.form.empresa.trim() === "") {
      valida = false;
      error.funcion = window.confirm(
        "Por Favor, Ingrese en nombre de su Empresa"
      );
      
        return;
      
    }
    if (this.state.form.city.trim() === "") {
      valida = false;
      error.city = window.confirm(
        "Por Favor, ingresar un valor en campo Ciudad"
      );
      
        return;
      
    }
    if (this.state.form.country.trim() === "") {
      valida = false;
      error.country = window.confirm(
        "Por Favor, ingresar un valor en campo Pais"
      );
      
        return;
      
    }
    this.setState({
      error: error,
    });

    if (valida === true) {
      window.confirm("El registro se Guardo con Exito!!");
      lista.push(valorNuevo);
      this.setState({
        modalInsertar: false,
        data: lista,
        form: {
          id: "",
          name: "",
          funcion: "",
          empresa: "",
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

  render() {
    return (
      <>
        <Container>
          
          <br />
          <thead>
            <h1>Formulario Registro de Usuarios</h1>
          </thead>
          <br />
          <Table>
            <thead>

              <tr>
                <th>ID</th>
                <th>Nombres y Apellidos</th>
                <th>Funcion | Puesto</th>
                <th>Empresa</th>
                <th>Ciudad</th>
                <th>Pais</th>
                <th>Acción</th>
               
                {''}
                <th>
                    <Button
                      color="btn btn-success btn-sm"
                      onClick={() => this.mostrarModalInsertar()}
                    >
                      Registrar
                    </Button>
                    </th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato, idx) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.name}</td>
                  <td>{dato.funcion}</td>
                  <td>{dato.empresa}</td>
                  <td>{dato.city}</td>
                  <td>{dato.country}</td>

                  <td>
                   {' '}
                    <Button
                      color="btn btn-primary btn-sm"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{' '}
                    <Button
                      color="btn btn-danger btn-sm"
                      onClick={() => this.eliminar(dato)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal  isOpen={this.state.modalActualizar}>
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
            <FormGroup >
              <label className="a"  >Nombres y Apellidos:</label>
              
              <input
                className="form-control"
                name="name"
                id="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="a">Funcion | Puesto:</label>
              <input
                className="form-control"
                name="funcion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.funcion}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="a">Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.empresa}
              />
            </FormGroup>
            
            <FormGroup>
              <label className="a">Ciudad:</label>
              <input
                className="form-control"
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
              onClick={() => this.editar(this.state.form)}
            >
              Modificar
            </Button>
            <Button
              color="btn btn-secondary btn-sm"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Registro de Datos</h3>
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
                value={this.state.data.length+1}
              />
            </FormGroup> */}
            <FormGroup>
              <label className="a"  htmlFor="name">Nombres y Apellidos:</label>
              <input
                className="form-control"
                name="name"
                id="name"
                required
                placeholder="Ingresar Nombre y Apellido"
                type="text"
                onChange={this.handleChange}
                aria-describedby="nameHelp"
                
              />
            </FormGroup>

            <FormGroup>
              <label className="a" htmlFor="funcion">Funcion | Puesto:</label>
              <input
                className="form-control"
                name="funcion"
                required
                id="funcion"
                placeholder="Ingresar el puesto en el que se desempeña"
                type="text"
                onChange={this.handleChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <label className="a" htmlFor="company">Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                id="company"
                type="text"
                placeholder="Ingresar el Nombre de la Empresa"
                required
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label className="a" htmlFor="city">Ciudad:</label>
              <input
                className="form-control"
                name="city"
                id="city"
                type="text"
                placeholder="Ingresar el Nombre de la Ciudad"
                required
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label className="a" htmlFor="country">Pais:</label>
              <input
                className="form-control"
                name="country"
                id="country"
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
              onClick={() => this.insertar()}
            >
              Guardar
            </Button>
            <Button
              color="btn btn-secondary btn-sm"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
