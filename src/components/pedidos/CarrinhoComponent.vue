<template>
    <div>
        <div style="float: left;width: 150px;margin-top: 15px;">
            <button class="btn btn-primary" @click="confirmar()">
                Confirmar
            </button>  
        </div>
        <div style="float: left;margin-top: 15px;">
            <button class="btn btn-primary" @click="removerCarrinho()">
                Remover Carrinho
            </button>              
        </div>
        <div style="margin-top: 20px;float: left;width: 100%;"> 
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">NOME</th>
                        <th scope="col">PREÇO</th>                    
                        <th scope="col">QUANTIDADE</th>
                        <th scope=""></th>                    
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(carrinho,i) in carrinho" :key="{i}"> 
                        <td v-if="!isNaN(i)">{{carrinho.nome}}</td>
                        <td v-if="!isNaN(i)">{{carrinho.valor}}</td>
                        <td v-if="!isNaN(i)">{{carrinho.quantidade}}</td>                                       
                        <td v-if="!isNaN(i)">                      
                            <button class="btn btn-sm btn-danger" @click="apagarItemCarrinho(carrinho.id)" title="Retirar produto do carrinho">
                                <i class="bi bi-trash-fill" style="cursor: pointer"></i>
                            </button>
                        </td>                    
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{{carrinho.total}}</td>
                        <td colspan="2">{{carrinho.quantidadeTotal}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import PedidoMixins from '@/mixins/PedidoMixins';

    export default {
        name: 'CarrinhoComponent',
        mixins: [PedidoMixins],
        created() {   
            if(sessionStorage.getItem('token') === null) {
                this.$router.push({ name: 'login'});  
            } 
                     
            this.listarCarrinho();
        }    
    }
</script>