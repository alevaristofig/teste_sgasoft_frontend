<template>
    <div>
        <div style="float: left;width: 150px;">
            <router-link class="list-group-item mt-3" :to="{ name: 'carrinho'}">
                <button class="btn btn-primary">Ver Carrinho</button>
            </router-link>  
        </div>   
        <div style="float: left;">
            <router-link class="list-group-item mt-3" :to="{ name: 'listapedido'}">
                <button class="btn btn-primary">Ver Pedido</button>
            </router-link>  
        </div>  
        <div style="margin-top: 20px;float: left;width: 100%;">   
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">NOME</th>
                        <th scope="col">COR</th>
                        <th scope="col">PREÇO</th>                    
                        <th scope=""></th>
                        <th scope=""></th>
                        <th scope=""></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(produto,i) in produtos" :key="{i}"> 
                        <td>{{produto.nome}}</td>
                        <td>{{produto.cor}}</td>
                        <td>{{produto.preco}}</td>                                       
                        <td style="padding-top: 36px">  
                            <button class="btn btn-sm btn-primary me-2" @click="acionarCarrinho(i,produtos)">
                                <i class="bi bi-cart" style="cursor: pointer" title="Adicionar o carrinho"></i>
                            </button>                      
                            <button class="btn btn-sm btn-danger" @click="apagar(produto.id)">
                                <i class="bi bi-trash-fill" style="cursor: pointer"></i>
                            </button>
                        </td>
                        <td>
                            <label>Qtd:</label>
                            <input type="text" class="form-control" style="width: 50px;" :id="`quantidade_${i}`"/>
                        </td>
                        <td>
                            <label>Observação:</label>
                            <input type="text" class="form-control" 
                                style="width: 350px;"                             
                                :id="`observacao_${i}`"/>
                        </td>
                        <td>
                            <label>Status:</label>
                            <select class="form-select" :id="`status_${i}`">
                                <option value="" disabled selected>-- Selecione uma opção</option>
                                <option value="PEN">Pendente</option>
                                <option value="CON">Concluído</option>
                                <option value="CAN">Cancelado</option>     
                            </select>
                        </td>                    
                    </tr>
                </tbody>
            </table>
        </div>   
    </div>
</template>

<script>
    import ProdutoMixins from '@/mixins/ProdutoMixins';
    import PedidoMixins from '@/mixins/PedidoMixins';

    export default {
        name: 'ProdutosComponent',
        mixins: [ProdutoMixins,PedidoMixins],
        created() {
            if(sessionStorage.getItem('token') === null) {
                this.$router.push({ name: 'login'});  
            } 
            
            this.listar();
        }    
    }
</script>