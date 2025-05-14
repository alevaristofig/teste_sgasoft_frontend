import axios from "axios";

export default {
    data: () => ({
        produtos: [],
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
            axios.get('http://localhost:8000/api/v1/produtos')
                    .then((response) => {                                                                    
                        this.produtos = response.data.data;
                        console.log(response.data.data); 
                    })
                    .catch((error) =>{                        
                        console.log(error);
            })
        },
        apagar(id) {
            axios.delete(`http://localhost:8000/api/v1/produtos/${id}`)
                .then(() => {                                        
                    alert('Produto deletado com sucesso!');                                 
                })
                .catch((error) =>{
                    console.log(error);
                    alert('Ocorreu um erro');                    
            });     
        },
      /*  buscar(id) {
            axios.get(`http://localhost:8000/api/v1/fornecedores/${id}`)
                .then((response) => {                                        
                    this.nome = response.data.nome;
                    this.cnpj = response.data.cnpj;
                    this.cep = response.data.cep;
                    this.status = response.data.status;
                    this.endereco = response.data.endereco;
                                    
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
        
        editar(id) {           
            if(this.validarCampos()) {                                                

                let data = {
                    'nome': this.nome,
                    'cnpj': this.cnpj,
                    'cep': this.cep,
                    'status': this.status,
                    'endereco': this.endereco
                }

                axios.put(`http://localhost:8000/api/v1/fornecedores/${id}`,data)
                    .then(() => {
                        alert('Fornecedor atualizado com sucesso');
                        this.$router.push({ name: 'fornecedor'});
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro');
                        console.log(error);
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
        }*/
    }
}