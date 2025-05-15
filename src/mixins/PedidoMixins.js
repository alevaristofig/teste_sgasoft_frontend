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
       
            let data = {
                'fornecedor_id': produtos[i].fornecedor_id,
                'data': dataAtual.toISOString(),
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
        }
    }
}
