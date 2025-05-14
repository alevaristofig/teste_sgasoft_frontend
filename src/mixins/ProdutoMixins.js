import axios from "axios";

export default {
    data: () => ({
        produtos: [],
        fornecedores: [],
        fornecedor: '',
        nome: '',
        fornecedor_id: '',
        referencia: '',
        cor: '',
        preco: '',
        classNome: false,
        classReferencia: false,
        classCor: false,
        classPreco: false,
        classFornecedor: false,
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
        listarFornecedores(){                
            axios.get('http://localhost:8000/api/v1/fornecedores')
                    .then((response) => {                                             
                        this.fornecedores = response.data
                    })
                    .catch((error) =>{                        
                        console.log(error);
            })
        },
        buscar(id) {
            axios.get(`http://localhost:8000/api/v1/produtos/${id}`)
                .then((response) => {                                        
                    this.nome = response.data.nome;
                    this.fornecedor = response.data.fornecedor_id;
                    this.referencia = response.data.referencia;
                    this.cor = response.data.cor;
                    this.preco = response.data.preco;                                                        
                })
                .catch((error) =>{
                    console.log(error);
                    alert('Ocorreu um erro');                    
            });           
        },
        editar(id) {           
            if(this.validarCampos()) {                                                

                let data = {
                    'nome': this.nome,
                    'fornecedor_id': this.fornecedor,
                    'referencia': this.referencia,
                    'cor': this.cor,
                    'preco': this.preco
                }

                axios.put(`http://localhost:8000/api/v1/produtos/${id}`,data)
                    .then(() => {
                        alert('Produto atualizado com sucesso');
                        this.$router.push({ name: 'produto'});
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro');
                        console.log(error);
                });
            }           
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
      /*  
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
        },*/
        
        
        validarCampos() {    
            let erro = false;

            if(this.nome === '') {                
                this.classNome = true;
                erro = true;
            } else {
                this.classNome = false;
            }

            if(this.referencia === '') {                
                this.classReferencia = true;
                erro = true;
            } else {
                this.classReferencia = false;
            }

            if(this.cor === '') {                
                this.classCor = true;
                erro = true;
            } else {
                this.classCor = false;
            }

            if(this.preco === '') {                            
                this.classPreco = true;
                erro = true;
            } else {
                this.classPreco = false;
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