import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
            axios.get('http://localhost:8000/api/v1/produtos',{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then((response) => {                                                                    
                        this.produtos = response.data.data;                         
                    })
                    .catch(() =>{                                               
                        const listaError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };

                        listaError();
            })
        },
        listarFornecedores(){                
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
            axios.get(`http://localhost:8000/api/v1/produtos/${id}`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then((response) => {                                        
                    this.nome = response.data.nome;
                    this.fornecedor = response.data.fornecedor_id;
                    this.referencia = response.data.referencia;
                    this.cor = response.data.cor;
                    this.preco = response.data.preco;                                                        
                })
                .catch(() =>{
                    const buscaError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };

                    buscaError();                   
            });           
        },
        salvar() {           
            if(this.validarCampos()) {                  
                let data = {
                    'nome': this.nome,
                    'fornecedor_id': this.fornecedor,
                    'referencia': this.referencia,
                    'cor': this.cor,
                    'preco': this.preco
                }

                axios.post(`http://localhost:8000/api/v1/produtos`,data,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {                          
                        this.nome = '';
                        this.fornecedor = '';
                        this.referencia = '';
                        this.cor = '';
                        this.preco = '';     
                        
                        const insertSucesso = () => {
                            toast("Produto criado com sucesso,", { type: "success" });
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
        editar(id) {           
            if(this.validarCampos()) {                                                

                let data = {
                    'nome': this.nome,
                    'fornecedor_id': this.fornecedor,
                    'referencia': this.referencia,
                    'cor': this.cor,
                    'preco': this.preco
                }

                axios.put(`http://localhost:8000/api/v1/produtos/${id}`,data,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {
                        const editaSucesso = () => {
                            toast("Produto atualizado com sucesso,", { type: "success" });
                        };  
                                                
                        editaSucesso();
                        this.$router.push({ name: 'produto'});
                    })
                    .catch(() =>{
                         const editaError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };

                        editaError();
                });
            }           
        },
        apagar(id) {
            axios.delete(`http://localhost:8000/api/v1/produtos/${id}`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then(() => {                                        
                     const delSucesso = () => {
                        toast("Produto removido com sucesso,", { type: "success" });
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