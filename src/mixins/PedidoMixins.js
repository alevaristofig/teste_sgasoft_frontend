import axios from "axios";

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

            axios.post(`http://localhost:8000/api/v1/pedidos`,data)
                    .then(() => {
                        alert('Produto adicionado no carrinho');    
                        
                        quantidade.value = '';
                        observacao.value = '';
                        status.value = '';
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro'+ error);
                        console.log(error);
            });
        },
        listarPedidos() {
            axios.get(`http://localhost:8000/api/v1/pedidos`)
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
                    .catch((error) =>{
                        alert('Ocorreu um erro'+ error);
                        console.log(error);
            });
        },
        listarCarrinho() {            
            axios.get(`http://localhost:8000/api/v1/pedidos/listarcarrinho`)
                    .then((response) => {
                        this.carrinho = response.data;                        
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro'+ error);
                        console.log(error);
            });
        },
        apagarItemCarrinho(id) {            
            axios.get(`http://localhost:8000/api/v1/pedidos/retiraritemcarrinho/${id}`)
                    .then((response) => {
                        console.log(response);                                               
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro'+ error);
                        console.log(error);
            });
        },
        removerCarrinho() {
            axios.get(`http://localhost:8000/api/v1/pedidos/apagarCarrinho`)
                .then((response) => {
                    alert('Carrinho removido com sucesso')                                     
                    console.log(response);     
                    
                     this.$router.push({ name: 'pedido'});
                })
                .catch((error) =>{
                    alert('Ocorreu um erro'+ error);
                    console.log(error);
            });
        },
        confirmar() {
            axios.get(`http://localhost:8000/api/v1/pedidos/confirmarpedido`)
                    .then((response) => {
                        console.log(response);                                               
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro'+ error);
                        console.log(error);
            });
        },
        apagarPedido(id) {
            axios.delete(`http://localhost:8000/api/v1/pedidos/${id}`)
                .then(() => {                                        
                    alert('Pedido deletado com sucesso!');  
                    this.$router.push({ name: 'pedido'});                               
                })
                .catch((error) =>{
                    console.log(error);
                    alert('Ocorreu um erro');                    
            });
        },
        buscar(id) {
            axios.get(`http://localhost:8000/api/v1/pedidos/${id}`)
                .then((response) => {    
                    let aux = JSON.parse(response.data.produtos);
                                        
                    this.nome = aux[0].nome;                                                          
                    this.observacao = response.data.observacao;
                    this.status = response.data.status;                                                        
                })
                .catch((error) =>{
                    console.log(error);
                    alert('Ocorreu um erro');                    
            }); 
        },
        editar(id) {
            if(this.validarCampos()) {
                let data = {
                    'observacao': this.observacao,
                    'status': this.status
                };

                axios.patch(`http://localhost:8000/api/v1/pedidos/${id}`,data)
                    .then(() => {
                        alert('Pedido atualizado com sucesso');
                        this.$router.push({ name: 'listapedido'});
                    })
                    .catch((error) =>{
                        alert('Ocorreu um erro');
                        console.log(error);
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
