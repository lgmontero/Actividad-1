import React from "react";
 import {Country} from "./Country"
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter,} from "reactstrap";



const data = [
  // {
  //   id: 1,
  //   city: "La Rioja",
  //   country: "Argentina",
  //   test: "prueba1"
  // },
  // {
  //   id: 2,
  //   city: "Santiago",
  //   country: "Chile",
  //   test: "prueba2"
  // },
  // {
  //   id: 3,
  //   city: "Natal",
  //   country: "Brasil",
  //   test: "prueba3"
  // },
];



// componentDidMount() {
//   if (localStorage.getItem("data") != null) {
//     this.setState({
//       data: JSON.parse(localStorage.getItem("data")),
//     });
//   }
// }

const options = [
  
    
  { test: "1" },
  { test: "2" }

];



export class City extends React.Component {

  state = {
    data: data, 
   
    modalActualizar: false,
    modalInsertar: false,
    
    form: {
      id: "",
      city: "",
      test: {}
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
          
          arreglo[contador].city = dato.city;
          arreglo[contador].country = dato.country;
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false,
        form: { id: "",  city: "", country: "", },
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
          city: "",
          country: "",
          test: {},

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

    
    this.setState({
      form: { ...this.state.form, [e.target.test]: e.target.value },
    })
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
                <th>Prueba</th>
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
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.city}</td>
                  <td>{dato.country}</td>
                  <td>{dato.test}</td>

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
              <label className="a">Ciudad:</label>
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



            <FormGroup>
              <label className="a">Prueba:</label>
              
              <select
                
                className="form-control"
                name= "test"
                placeholder="Ingresar el Nombre del Pais"
                required
                value={this.state.test}
                onChange={this.handleOptions}
                
              > 
              {options.map(({ test }) => <option value={test} >{test}</option>)}
              </select>
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