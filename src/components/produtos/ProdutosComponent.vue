<template>
    <div>
        <router-link class="list-group-item mt-3" :to="{ name: 'cadastroproduto'}">
            <button class="btn btn-primary">Adicionar</button>
        </router-link>  
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">FORNECEDOR</th>
                    <th scope="col">NOME</th>
                    <th scope="col">REFERÊNCIA</th>
                    <th scope="col">COR</th>
                    <th scope="col">PREÇO</th>                    
                    <th scope=""></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(produto,i) in produtos" :key="{i}">
                    <td>{{produto.id}}</td>
                    <td>{{produto.fornecedor_id}}</td> 
                    <td>{{produto.nome}}</td>
                    <td>{{produto.referencia}}</td>
                    <td>{{produto.cor}}</td>
                    <td>{{produto.preco}}</td>                                       
                    <td>
                        <router-link :to="{name: 'editarproduto', params: {id: produto.id}}" class="btn btn-sm btn-primary me-2">
                            <i class="bi bi-pencil-square" style="cursor: pointer"></i>
                        </router-link>                         
                        <button class="btn btn-sm btn-danger" @click="apagar(produto.id)">
                            <i class="bi bi-trash-fill" style="cursor: pointer"></i>
                        </button>
                    </td>
                    
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import ProdutoMixins from '@/mixins/ProdutoMixins';

    export default {
        name: 'ProdutosComponent',
        mixins: [ProdutoMixins],
        created() {
            this.listar();
        }    
    }
</script>