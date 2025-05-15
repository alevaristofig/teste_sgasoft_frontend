import axios from "axios";

export default {
    data: () => ({
        usuarios: [],
        usuario: '',
        fornecedor: '',
        classUsuario: false,
        classFornecedor: false,
    }),
     methods: {
        buscarUsuarioVendedor() {
            axios.get(`http://localhost:8000/api/v1/usuarios/vendedor`)
                .then((response) => {                                                           
                    this.usuarios = response.data                                    
                })
                .catch((error) =>{
                    console.log(error);
                    alert('Ocorreu um erro');                    
            });           
        },
        salvarUsuarioFornecedor() {
            if(this.validarCampos()) { 
                let data = {
                    'usuario_id': this.usuario,
                    'fornecedor_id': this.fornecedor                  
                };

                axios.post(`http://localhost:8000/api/v1/usuariofornecedor`,data)
                    .then(() => {
                        alert('Usuario/Fornecedor cadastrado com sucesso');   
                        this.usuario = '';
                        this.fornecedor = '';                                          
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro');
                        console.log(error);
                });
            }
        },
        validarCampos() {    
            let erro = false;

            if(this.usuario === '') {                
                this.classUsuario = true;
                erro = true;
            } else {
                this.classUsuario = false;
            }

            if(this.fornecedor === '') {                
                this.classFornecedor = true;
                erro = true;
            } else {
                this.classFornecedor = false;
            }

            if(erro) {
                return false;
            }

            return true;
        }
     }
}