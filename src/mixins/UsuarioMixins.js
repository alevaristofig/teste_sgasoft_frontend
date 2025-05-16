import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data: () => ({
        emailLogin: '',
        password: '',
        usuarios: [],
        usuariosVendedor: [],
        nome: '',
        email: '',
        senha: '',
        status: '',
        tipo: '',
        classNome: false,
        classEmail: false,
        classSenha: false,
        classStatus: false,
        classTipo: false,
    }),
    methods: {
        logar() {
            let data = {
                'email': this.emailLogin,
                'password': this.password
            }
            
            axios.post(`http://localhost:8000/api/v1/autenticacao`,data)
                    .then((response) => {                        
                        sessionStorage.setItem('token',response.data.token);
                        sessionStorage.setItem('tipo',response.data.tipo);
                        this.$router.push({ name: 'home'});                                        
                    })
                    .catch(() =>{
                        const logarError = () => {
                            toast("Usuário/senha não conferem,", { type: "error" });
                        };  
                        
                        logarError();
                    });
        },
        logout() {            
            axios.get(`http://localhost:8000/api/v1/logout`, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }                
            })  
            .then(() => {
                sessionStorage.removeItem('token');
                this.$router.push({ name: 'login'});  
            })
            .catch(() =>{
                const logoutError = () => {
                    toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                };  
                        
                logoutError();
            })               
        },
        listar(){            
            axios.get('http://localhost:8000/api/v1/usuarios',{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then((response) => {                        
                        this.usuarios = response.data
                    })
                    .catch(() =>{                        
                        const listartError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };  
                        
                        listartError();
            })
        },
        buscar(id) {
            axios.get(`http://localhost:8000/api/v1/usuarios/${id}`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then((response) => {   
                                                       
                    this.nome = response.data.name;
                    this.email = response.data.email;
                    this.senha = response.data.password;
                    this.status = response.data.status;
                    this.tipo = response.data.tipo;
                                    
                })
                .catch(() =>{
                    const buscarError = () => {
                        toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };  
                        
                    buscarError();                   
            });           
        },
        salvar() {           
            if(this.validarCampos()) {                  

                let data = {
                    'name': this.nome,
                    'email': this.email,
                    'password': this.senha,
                    'status': this.status,
                    'tipo': this.tipo
                }

                axios.post(`http://localhost:8000/api/v1/usuarios`,data,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {                           
                        this.nome = '';
                        this.email = '';
                        this.senha = '';
                        this.status = '';
                        this.tipo = '';    
                        
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
        apagar(id) {
            axios.delete(`http://localhost:8000/api/v1/usuarios/${id}`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then(() => {                                        
                    const delSucesso = () => {
                        toast("Usuário removido com sucesso,", { type: "success" });
                    };  
                        
                    delSucesso();
                    this.$router.push({ name: 'usuario'});                                 
                })
                .catch(() =>{                    
                    const delError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };  
                        
                    delError();                                        
            });     
        },
        editarUsuario(id) {                    
            if(this.validarCampos()) {                                 

                let data = {
                    'name': this.nome,
                    'email': this.email,
                    'password': this.senha,
                    'status': this.status,
                    'tipo': this.tipo
                }

                axios.put(`http://localhost:8000/api/v1/usuarios/${id}`,data,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {
                         const editarSucesso = () => {
                        toast("Usuário removido com sucesso,", { type: "success" });
                    };  
                        
                        editarSucesso();
                        this.$router.push({ name: 'usuario'});
                    })
                    .catch(() =>{
                        const editarError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };  
                        
                        editarError();  
                });
            }           
        },        
        validarCampos() {    
            let erro = false;

            if(this.nome === '') {                
                this.classNome = true;
                erro = true;
            } else {
                this.classNome = false;
            }

            if(this.email === '') {                
                this.classEmail = true;
                erro = true;
            } else {
                this.classEmail = false;
            }

            if(this.senha === '') {                
                this.classSenha = true;
                erro = true;
            } else {
                this.classSenha = false;
            }

            if(this.status === '') {                            
                this.classStatus = true;
                erro = true;
            } else {
                this.classStatus = false;
            }

            if(this.tipo === '') {                
                this.classTipo = true;
                erro = true;
            } else {
                this.classTipo = false;
            }

            if(erro) {
                return false;
            }

            return true;
        }
    }
}