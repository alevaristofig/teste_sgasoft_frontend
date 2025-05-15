<template>
    <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">FORNECEDOR</th>
                    <th scope="col">PRODUTOS</th>
                    <th scope="col">PREÇO</th>                    
                    <th scope="col">QUANTIDADE</th>
                    <th scope="col">OBSERVACAO</th>
                    <th scope="col">STATUS</th>
                    <th scope=""></th>                    
                </tr>
            </thead>
            <tbody>
                
                <tr v-for="(pedido,i) in pedidos" :key="{i}"> 
                    <td>{{pedido.fornecedor.nome}}</td>
                    <td>{{produtos[i].nome}}</td>
                    <td>{{produtos[i].valor}}</td> 
                    <td>{{produtos[i].quantidade}}</td> 
                    <td>{{pedido.observacao}}</td>
                    <td>                        
                        <select class="form-select" v-model="pedido.status">
                            <option value="" disabled selected>-- Selecione uma opção</option>
                            <option value="PEN">Pendente</option>
                            <option value="CON">Concluído</option>
                            <option value="CAN">Cancelado</option>     
                        </select>
                    </td>                                         
                    <td>
                        <router-link :to="{name: 'editarpedido', params: {id: pedido.id}}" class="btn btn-sm btn-primary me-2">
                            <i class="bi bi-pencil-square" style="cursor: pointer"></i>
                        </router-link>                         
                        <button class="btn btn-sm btn-danger" @click="apagarPedido(pedido.id)">
                            <i class="bi bi-trash-fill" style="cursor: pointer"></i>
                        </button>
                    </td>                 
                </tr>
                <tr>
                    <td>Valor Total</td>
                    <td>{{valorTotal}}</td>
                    <td>Quantidade Total</td>
                    <td colspan="2">{{quantidadeTotal}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import PedidoMixins from '@/mixins/PedidoMixins';

    export default {
        name: 'ListaPedidosComponent',
        mixins: [PedidoMixins],
        created() {
            this.listarPedidos();
        }    
    }
</script>