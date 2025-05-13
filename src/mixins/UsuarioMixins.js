import axios from "axios";

export default {
    data: () => ({
        usuarios: [],
        nome: '',
        email: '',
        senha: '',
        status: 0,
        tipo: 'V',
        classNome: false,
        classEmail: false,
        classSenha: false
    }),
    methods: {
        listar(){            
            axios.get('http://localhost:8000/api/v1/usuarios')
                    .then((response) => {                        
                        this.usuarios = response.data
                    })
                    .catch((error) =>{                        
                        console.log(error);
            })
        },
        buscar(id) {
            axios.get(`http://localhost:8000/api/v1/usuarios/${id}`)
                .then((response) => {                                        
                    this.nome = response.data.nome;
                    this.email = response.data.email;
                    this.senha = response.data.senha;
                    this.status = response.data.status;
                    this.tipo = response.data.tipo;
                                    
                })
                .catch((error) =>{
                    console.log(error);
                    alert('Ocorreu um erro');                    
            });           
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

            if(erro) {
                return false;
            }

            return true;
        }
    }
}