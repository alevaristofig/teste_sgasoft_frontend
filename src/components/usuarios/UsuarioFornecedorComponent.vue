<template>
    <div>
        <div class="mb-3 mt-3 row">
            <label class="col-sm-1 col-form-label">Usuário*:</label>
            <div class="col-sm-8">
                <select class="form-select" :class="{'border-danger': classUsuario}" v-model="usuario">
                    <option value="" disabled>-- Selecione uma opção</option>
                    <option 
                        v-for="u in usuarios" 
                        :key="u.id"
                        :value="u.id"
                    >
                        {{ u.id }} - {{ u.name }}
                    </option>
                </select>
            </div>
        </div>
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
        <div>
            <button type="button" class="btn btn-primary" @click="salvarUsuarioFornecedor(this.$route.params.id)">Salvar</button>
        </div>
    </div>
</template>

<script>
    import FornecedorMixins from '@/mixins/FornecedorMixins';
    import UsuarioFornecedorMixins from '@/mixins/UsuarioFornecedorMixins';

    export default {
        name: "UsuarioFornecedorComponent",
        mixins: [FornecedorMixins,UsuarioFornecedorMixins],
        created() { 
            if(sessionStorage.getItem('token') === null) {
                this.$router.push({ name: 'login'});  
            } 

            this.listar();
            this.buscarUsuarioVendedor();
        }
    }
</script>