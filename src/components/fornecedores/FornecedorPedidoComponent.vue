<template>
    <div>
        <div style="margin-top: 20px;float: left;width: 100%;">   
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">NOME</th>
                        <th scope="col">PRODUTO</th>                        
                        <th scope="col">PREÇO</th>                    
                        <th scope="col">QUANTIDADE</th>
                        <th scope="col">OBSERVAÇÃO</th>
                        <th scope="col">STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pf,i) in pedidosFornecedor" :key="{i}"> 
                        <td>{{pf.fornecedor.nome}}</td>
                        <td>{{produtosFornecedor[i].nome}}</td>  
                        <td>{{produtosFornecedor[i].valor}}</td>  
                        <td>{{produtosFornecedor[i].quantidade}}</td> 
                        <td>{{pf.observacao}}</td> 
                        <td>{{pf.status}}</td>               
                    </tr>
                    <tr>
                        <td>Valor Total</td>
                        <td>{{valorTotal}}</td>
                        <td>Quantidade Total</td>
                        <td colspan="3">{{quantidadeTotal}}</td>
                    </tr>
                </tbody>
            </table>
        </div>   
    </div>
</template>

<script>
    import FornecedorMixins from '@/mixins/FornecedorMixins';

    export default {
        name: 'FornecedorPedidoComponent',
        mixins: [FornecedorMixins],
        created() {
            if(sessionStorage.getItem('token') === null) {
                this.$router.push({ name: 'login'});  
            } 
            
            this.buscarPedidoCnpj(this.$route.params.cnpj);
        }    
    }
</script>