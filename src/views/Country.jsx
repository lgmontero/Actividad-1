import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {  Table,  Button,  Container,  Modal,  ModalHeader,  ModalBody,  FormGroup,  ModalFooter,} from "reactstrap";



// (()=>{

//     localStorage.clear();

// })();
const datac = [
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
  constructor(props){
  super(props) 
  this.props=props
  this.state = {
    datac: datac,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      country: "",
    },
    error: {},
  };
  }
  componentDidMount() {
    if (localStorage.getItem("datac") != null) {
      this.setState({
        datac: JSON.parse(localStorage.getItem("datac")),
      });
    }
}

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
      var arreglo = this.state.datac;
      arreglo.forEach((registro) => {
        if (dato.id === registro.id) {
          arreglo[contador].country = dato.country;
        }
        contador++;
      });
      this.setState({ datac: arreglo, modalActualizar: false,
        form: { id: "", country: "", },
      });
    }
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar este Registro "
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.datac;
      arreglo.forEach((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ datac: arreglo, modalActualizar: false });
    }
  };

  insertar = (e) => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.datac.length + 1;
    var lista = this.state.datac;
    let error = {};
    var valida = true;
    
    
       

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
      localStorage.setItem('datac', JSON.stringify(this.state.datac));
     
     
        this.setState({
        modalInsertar: false,
        datac: lista,
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
               
                {' '}
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
              {this.state.datac.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
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
                value={this.state.datac.length+1}
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
