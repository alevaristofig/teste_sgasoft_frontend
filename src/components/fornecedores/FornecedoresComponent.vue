<template>
    <div>
        <router-link class="list-group-item mt-3" :to="{ name: 'cadastrofornecedor'}">
            <button class="btn btn-primary">Adicionar</button>
        </router-link>  
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOME</th>
                    <th scope="col">CNPJ</th>
                    <th scope="col">CEP</th>
                    <th scope="col">ENDEREÇO</th>
                    <th scope="col">STATUS</th>
                    <th scope=""></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(fornecedor,i) in fornecedores" :key="{i}">
                    <td>{{fornecedor.id}}</td>
                    <td>{{fornecedor.nome}}</td>
                    <td>{{fornecedor.cnpj}}</td>
                    <td>{{fornecedor.cep}}</td>
                    <td>{{fornecedor.endereco}}</td>
                    <td>{{fornecedor.status == 1 ? 'Ativo' : 'Inativo'}}</td>                    
                    <td>
                        <router-link :to="{name: 'editarfornecedor', params: {id: fornecedor.id}}" class="btn btn-sm btn-primary me-2">
                            <i class="bi bi-pencil-square" style="cursor: pointer"></i>
                        </router-link>                         
                        <button class="btn btn-sm btn-danger" @click="apagar(fornecedor.id)">
                            <i class="bi bi-trash-fill" style="cursor: pointer"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import FornecedorMixins from '@/mixins/FornecedorMixins';

    export default {
        name: 'FornecedorComponent',
        mixins: [FornecedorMixins],
        created() {
            if(sessionStorage.getItem('token') === null) {
                this.$router.push({ name: 'login'});  
            } 
            
            this.listar();
        }    
    }
</script>