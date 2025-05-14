<template>
    <div>
        <div class="mb-3 mt-3 row">
            <label class="col-sm-1 col-form-label">Fornecedores*:</label>
            <div class="col-sm-8">
                <select class="form-select" :class="{'border-danger': classFornecedor}" v-model="fornecedor">
                    <option value="" disabled>-- Selecione uma opção</option>
                    <option 
                        v-for="f in fornecedores" 
                        :key="f.id"
                        :value="f.id"
                    >
                        {{ f.id }} - {{ f.nome }}
                    </option>
                </select>
            </div>
        </div>
        <div class="mb-3 mt-3 row">
            <label class="col-sm-1 col-form-label">Nome*:</label>
            <div class="col-sm-8">
                <input type="text" id="nome" class="form-control" :class="{'border-danger': classNome}" v-model="nome"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">Referência*:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" :class="{'border-danger': classReferencia}" v-model="referencia"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">Cor*:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" @blur="buscarCep" :class="{'border-danger': classCor}" v-model="cor"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">Preço*:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control"  :class="{'border-danger': classPreco}" v-model="preco"/>
            </div>
        </div>
        <div>
            <button type="button" class="btn btn-primary" @click="editar(this.$route.params.id)">Editar</button>
        </div>
    </div>
</template>

<script>
    import ProdutoMixins from '@/mixins/ProdutoMixins';

    export default {
        name: "EditarProdutoComponent",
        mixins: [ProdutoMixins],
        created() {
            this.buscar(this.$route.params.id);
            this.listarFornecedores();
        }
    }
</script>
