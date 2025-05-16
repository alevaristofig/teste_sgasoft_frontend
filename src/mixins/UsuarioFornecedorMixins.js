import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
            axios.get(`http://localhost:8000/api/v1/usuarios/vendedor`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then((response) => {                                                           
                    this.usuarios = response.data                                    
                })
                .catch(() =>{
                    const buscaError = () => {
                        toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };  
                                            
                    buscaError();                    
            });           
        },
        salvarUsuarioFornecedor() {
            if(this.validarCampos()) { 
                let data = {
                    'usuario_id': this.usuario,
                    'fornecedor_id': this.fornecedor                  
                };

                axios.post(`http://localhost:8000/api/v1/usuariofornecedor`,data,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {                          
                        this.usuario = '';
                        this.fornecedor = '';     
                        
                        const insertSucesso = () => {
                            toast("Usuário criado com sucesso,", { type: "success" });
                        };  
                        
                        insertSucesso(); 
                    })
                    .catch(() =>{
                        const insertError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };

                        insertError();
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