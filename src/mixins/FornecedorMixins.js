import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data: () => ({
        fornecedores: [],
        pedidosFornecedor: [],
        produtosFornecedor: [],
        valorTotal: 0,
        quantidadeTotal: 0,
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
            axios.get('http://localhost:8000/api/v1/fornecedores',{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then((response) => {                                                                 
                        this.fornecedores = response.data
                    })
                    .catch(() =>{                        
                        const listaError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };

                        listaError();
            })
        },
        buscar(id) {
            axios.get(`http://localhost:8000/api/v1/fornecedores/${id}`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then((response) => {                                        
                    this.nome = response.data.nome;
                    this.cnpj = response.data.cnpj;
                    this.cep = response.data.cep;
                    this.status = response.data.status;
                    this.endereco = response.data.endereco;
                                    
                })
                .catch(() =>{
                    const buscaError = () => {
                        toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };

                    buscaError();                   
            });           
        },
        buscarCep() {
            axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
                .then((response) => {                                        
                    let resp = response.data;                    
                    this.endereco = `${resp.logradouro} ${resp.complemento} ${resp.bairro} ${resp.localidade} ${resp.uf} ${resp.cep}`
                                    
                })
                .catch(() =>{
                    const cepError = () => {
                        toast("Cep Inválido,", { type: "error" });
                    };

                    cepError();                    
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

                axios.post(`http://localhost:8000/api/v1/fornecedores`,data,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {                          
                        this.nome = '';
                        this.cnpj = '';
                        this.cep = '';
                        this.status = '';
                        this.endereco = '';   
                        
                        const insertSucesso = () => {
                            toast("Fornecedor criado com sucesso,", { type: "success" });
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
            axios.delete(`http://localhost:8000/api/v1/fornecedores/${id}`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then(() => {                                        
                    const delSucesso = () => {
                        toast("Fornecedor removido com sucesso,", { type: "success" });
                    };  
                                                
                    delSucesso();                                 
                })
                .catch(() =>{
                    const delError = () => {
                        toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };

                    delError();                    
            });     
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

                axios.put(`http://localhost:8000/api/v1/fornecedores/${id}`,data,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {
                       const editaSucesso = () => {
                            toast("Fornecedor atualizado com sucesso,", { type: "success" });
                        };  
                                                
                        editaSucesso();  

                        setTimeout(() => {
                            this.$router.push({ name: 'fornecedor'});
                        }, 7000);                        
                    })
                    .catch(() =>{
                        const editaError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };

                        editaError();
                });
            }           
        },
        buscarPedidoCnpj(cnpj) {
            cnpj = cnpj.replace(["."],"");
            cnpj = cnpj.replace(["."],"");
            cnpj = cnpj.replace(["/"],"");
            cnpj = cnpj.replace(["-"],"");
            
            axios.get(`http://localhost:8000/api/v1/fornecedores/${cnpj}/pedidos`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then((response) => {                                                         
                        this.pedidosFornecedor = response.data;   
                        
                        for(const p in this.pedidosFornecedor) {                            
                            let aux = JSON.parse(this.pedidosFornecedor[p].produtos);
                           
                            this.produtosFornecedor[p] = {                                
                                'quantidade': aux[0].quantidade,
                                'nome': aux[0].nome,
                                'valor': aux[0].valor                                
                            }
  
                            this.valorTotal+= aux[0].valor;
                            this.quantidadeTotal+= parseInt(aux[0].quantidade);
                        }   
                })
                .catch(() =>{
                    const buscaError = () => {
                        toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };

                    buscaError();                    
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