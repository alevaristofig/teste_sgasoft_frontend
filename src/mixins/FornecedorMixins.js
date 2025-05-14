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
        },*/
        buscarCep() {
            axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
                .then((response) => {                                        
                    let resp = response.data;                    
                    this.endereco = `${resp.logradouro} ${resp.complemento} ${resp.bairro} ${resp.localidade} ${resp.uf} ${resp.cep}`
                                    
                })
                .catch((error) =>{
                    console.log(error);
                    alert('Ocorreu um erro');                    
            });
            
        },
        salvar() {           
            if(this.validarCampos()) {                  
                let data = {
                    'nome': this.nome,
                    'cnpj': this.cnpj,
                    'cep': this.cep,
                    'status': this.status,
                    'endereco': this.endereco
                }

                axios.post(`http://localhost:8000/api/v1/fornecedores`,data)
                    .then(() => {
                        alert('Usuario cadastrado com sucesso');   
                        this.nome = '';
                        this.cnpj = '';
                        this.cep = '';
                        this.status = '';
                        this.endereco = '';                     
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro');
                        console.log(error);
                });
            }
        },
      /*  apagar(id) {
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

            if(this.cnpj === '') {                
                this.classCnpj = true;
                erro = true;
            } else {
                this.classCnpj = false;
            }

            if(this.cep === '') {                
                this.classCep = true;
                erro = true;
            } else {
                this.classCep = false;
            }

            if(this.status === '') {                            
                this.classStatus = true;
                erro = true;
            } else {
                this.classStatus = false;
            }

            if(this.endereco === '') {                
                this.classEndereco = true;
                erro = true;
            } else {
                this.classEndereco = false;
            }

            if(erro) {
                return false;
            }

            return true;
        }
    }
}