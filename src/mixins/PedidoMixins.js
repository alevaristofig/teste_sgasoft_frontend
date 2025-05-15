import axios from "axios";

export default {
    data: () => ({    
        carrinho: []    
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
        }
    }
}
