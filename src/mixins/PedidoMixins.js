import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data: () => ({    
        carrinho: [],
        pedidos: [],
        produtos: [],
        nome: '',
        quantidade: '',
        observacao: '',
        status: '',
        valorTotal: 0,
        quantidadeTotal: 0,
        classObservacao: false,    
        classStatus: false
    }),
    methods: {
        acionarCarrinho(i,produtos) {

            let quantidade = document.getElementById('quantidade_'+i);
            let observacao = document.getElementById('observacao_'+i);
            let status = document.getElementById('status_'+i);
            let dataAtual = new Date();
            dataAtual = dataAtual.toISOString();
            dataAtual = dataAtual.replace('T',' ');
            dataAtual = dataAtual.replace('Z',' ');

            let data = {
                'fornecedor_id': produtos[i].fornecedor_id,
                'data': dataAtual,
                'produtos': {
                    'id': produtos[i].id,
                    'nome': produtos[i].nome,
                    'valor': produtos[i].preco,
                    'quantidade': quantidade.value
                },
                'valor_total': quantidade.value * produtos[i].preco,
                'observacao': observacao.value,
                'status': status.value
            }

            axios.post(`http://localhost:8000/api/v1/pedidos`,data,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {                                                  
                        quantidade.value = '';
                        observacao.value = '';
                        status.value = '';

                        const insertCarrinhoSucesso = () => {
                            toast("Produto adicionado no carrinho,", { type: "success" });
                        };  
                        
                        insertCarrinhoSucesso();
                    })
                    .catch(() =>{
                         const insertCarrinhoError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };

                        insertCarrinhoError();
            });
        },
        listarPedidos() {
            axios.get(`http://localhost:8000/api/v1/pedidos`,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then((response) => {
                        this.pedidos = response.data;                       

                        for(const p in this.pedidos) {
                            let aux = JSON.parse(this.pedidos[p].produtos);
                            this.produtos[p] = {                                
                                'quantidade': aux.quantidade,
                                'nome': aux.nome,
                                'valor': aux.valor                                
                            }

                            this.valorTotal+= aux.valor;
                            this.quantidadeTotal+= parseInt(aux.quantidade);
                        }                                                
                    })
                    .catch(() =>{
                        const listaError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };

                        listaError();
            });
        },
        listarCarrinho() {            
            axios.get(`http://localhost:8000/api/v1/pedidos/listarcarrinho`,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then((response) => {
                        this.carrinho = response.data;                        
                    })
                    .catch(() =>{
                        const listaError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };

                        listaError();
            });
        },
        apagarItemCarrinho(id) {            
            axios.get(`http://localhost:8000/api/v1/pedidos/retiraritemcarrinho/${id}`,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {
                        const insertCarrinhoSucesso = () => {
                            toast("Produto retirado do carrinho,", { type: "success" });
                        };  
                        
                        insertCarrinhoSucesso();                                             
                    })
                    .catch(() =>{
                        const delCarrinhoError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };

                        delCarrinhoError();
            });
        },
        removerCarrinho() {
            axios.get(`http://localhost:8000/api/v1/pedidos/apagarCarrinho`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then(() => {
                    const delCarrinhoSucesso = () => {
                            toast("Carrinho removido com sucesso,", { type: "success" });
                    };  
                        
                    delCarrinhoSucesso();    
                    
                     this.$router.push({ name: 'pedido'});
                })
                .catch(() =>{
                    const delCarrinhoError = () => {
                        toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };

                    delCarrinhoError();
            });
        },
        confirmar() {
            axios.get(`http://localhost:8000/api/v1/pedidos/confirmarpedido`,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {
                        const confirmarSucesso = () => {
                            toast("Pedido registrado com sucesso,", { type: "success" });
                        };  
                        
                        confirmarSucesso();                                               
                    })
                    .catch(() =>{
                        const confirmarError = () => {
                            toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                        };

                        confirmarError();
            });
        },
        apagarPedido(id) {
            axios.delete(`http://localhost:8000/api/v1/pedidos/${id}`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then(() => {                                        
                    const apagarSucesso = () => {
                        toast("Pedido removido com sucesso,", { type: "success" });
                    };  
                        
                    apagarSucesso();

                    this.$router.push({ name: 'pedido'});                               
                })
                .catch(() =>{
                    const apagarError = () => {
                        toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };

                    apagarError();                   
            });
        },
        buscar(id) {
            axios.get(`http://localhost:8000/api/v1/pedidos/${id}`,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then((response) => {    
                    let aux = JSON.parse(response.data.produtos);
                                        
                    this.nome = aux[0].nome;                                                          
                    this.observacao = response.data.observacao;
                    this.status = response.data.status;                                                        
                })
                .catch(() =>{
                    const buscarError = () => {
                        toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };

                    buscarError();                     
            }); 
        },
        editar(id) {
            if(this.validarCampos()) {
                let data = {
                    'observacao': this.observacao,
                    'status': this.status
                };

                axios.patch(`http://localhost:8000/api/v1/pedidos/${id}`,data,{
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    .then(() => {
                        const editarSucesso = () => {
                            toast("Pedido atualizado com sucesso,", { type: "success" });
                        };  
                        
                        editarSucesso(); 

                        this.$router.push({ name: 'listapedido'});
                    })
                    .catch(() =>{
                        const buscarError = () => {
                        toast("Ocorreu um erro e a operação não foi realizada,", { type: "error" });
                    };

                    buscarError(); 
                });

            }
        },
        validarCampos() {    
            let erro = false;

            if(this.observacao === '') {                
                this.classObservacao = true;
                erro = true;
            } else {
                this.classObservacao = false;
            }

            if(this.status === '') {                
                this.classStatus = true;
                erro = true;
            } else {
                this.classStatus = false;
            }

            if(erro) {
                return false;
            }

            return true;
        }
    }
}
