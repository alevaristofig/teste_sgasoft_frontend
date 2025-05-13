import axios from "axios";

export default {
    data: () => ({
        fornecedores: [],
        nome: '',
        cnpj: '',
        cep: '',
        endereco: '',
        status: '',
        classNome: false,
        classCnpj: false,
        classCep: false,
        classStatus: false,
        classEndereco: false,
    }),
    methods: {
        listar(){                
            axios.get('http://localhost:8000/api/v1/fornecedores')
                    .then((response) => {                                             
                        this.fornecedores = response.data
                    })
                    .catch((error) =>{                        
                        console.log(error);
            })
        },
        /*buscar(id) {
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
        salvarUsuario() {           
            if(this.validarCampos()) {  
                let salt = bcrypt.genSaltSync(10);
                let senha = bcrypt.hashSync(this.senha,salt);

                let data = {
                    'nome': this.nome,
                    'email': this.email,
                    'senha': senha,
                    'status': this.status,
                    'tipo': this.tipo
                }

                axios.post(`http://localhost:8000/api/v1/usuarios`,data)
                    .then(() => {
                        alert('Usuario cadastrado com sucesso');   
                        this.nome = '';
                        this.email = '';
                        this.senha = '';
                        this.status = '';
                        this.tipo = '';                     
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro');
                        console.log(error);
                });
            }
        },
        apagar(id) {
            axios.delete(`http://localhost:8000/api/v1/usuarios/${id}`)
                .then(() => {                                        
                    alert('Usuario deletado com sucesso!');                                 
                })
                .catch((error) =>{
                    console.log(error);
                    alert('Ocorreu um erro');                    
            });     
        },
        editarUsuario(id) {           
            if(this.validarCampos()) {                                 
                let salt = bcrypt.genSaltSync(10);
                let senha = bcrypt.hashSync(this.senha,salt);

                let data = {
                    'nome': this.nome,
                    'email': this.email,
                    'senha': senha,
                    'status': this.status,
                    'tipo': this.tipo
                }

                axios.put(`http://localhost:8000/api/v1/usuarios/${id}`,data)
                    .then(() => {
                        alert('Usuario atualizado com sucesso');
                        this.$router.push({ name: 'usuario'});
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro');
                        console.log(error);
                });
            }           
        },*/
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
                alert('sim')             
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