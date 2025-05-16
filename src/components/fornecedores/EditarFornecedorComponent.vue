<template>
    <div>
        <div class="mb-3 mt-3 row">
            <label class="col-sm-1 col-form-label">Nome*:</label>
            <div class="col-sm-8">
                <input type="text" id="nome" class="form-control" :class="{'border-danger': classNome}" v-model="nome"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">Cnpj*:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" :class="{'border-danger': classCnpj}" v-model="cnpj"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">Cep*:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" @blur="buscarCep" :class="{'border-danger': classCep}" v-model="cep"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">Endereço*:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control"  :class="{'border-danger': classEndereco}" v-model="endereco"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">Status*</label>
            <div class="col-sm-10 mt-2 justify-content-start">
                <div class="form-check-inline">
                    <input type="radio" class="me-1" value="1" :class="{'border-danger': classStatus}" v-model="status">
                    <label class="form-check-label">Ativo</label>
                </div>
                <div class="form-check form-check-inline">                    
                    <input type="radio" class="me-1" value="0" :class="{'border-danger': classStatus}" v-model="status"/>
                    <label class="form-check-label">Inativo</label>
                </div>
            </div>
        </div>
        <div>
            <button type="button" class="btn btn-primary" @click="editar(this.$route.params.id)">Editar</button>
        </div>
    </div>
</template>

<script>
    import FornecedorMixins from '@/mixins/FornecedorMixins';

    export default {
        name: "FornecedorMixins",
        mixins: [FornecedorMixins],
        created() {
            if(sessionStorage.getItem('token') === null) {
                this.$router.push({ name: 'login'});  
            } 
            
            this.buscar(this.$route.params.id);
        }
    }
</script>
