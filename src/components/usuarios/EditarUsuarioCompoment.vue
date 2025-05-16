<template>
    <div>
        <div class="mb-3 mt-3 row">
            <label class="col-sm-1 col-form-label">Nome*:</label>
            <div class="col-sm-8">
                <input type="text" id="nome" class="form-control" :class="{'border-danger': classNome}" v-model="nome"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">E-mail*:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" :class="{'border-danger': classEmail}" v-model="email"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">Senha*:</label>
            <div class="col-sm-8">
                <input type="password" class="form-control" :class="{'border-danger': classSenha}" v-model="senha"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">Status*</label>
            <div class="col-sm-10 mt-2 justify-content-start">
                <div class="form-check-inline">
                    <input type="radio" class="me-1" value="1" v-model="status">
                    <label class="form-check-label">Ativo</label>
                </div>
                <div class="form-check form-check-inline">                    
                    <input type="radio" class="me-1" value="0" v-model="status"/>
                    <label class="form-check-label">Inativo</label>
                </div>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-sm-1 col-form-label">Tipo*</label>
            <div class="col-sm-10 mt-2 justify-content-start">
                <div class="form-check-inline">
                    <input type="radio" class="me-1" value="V" v-model="tipo">
                    <label class="form-check-label">Vendedor</label>
                </div>
                <div class="form-check form-check-inline">                    
                    <input type="radio" class="me-1" value="A" v-model="tipo"/>
                    <label class="form-check-label">Admin</label>
                </div>
            </div>
        </div>
        <div>
            <button type="button" class="btn btn-primary" @click="editarUsuario(this.$route.params.id)">Editar</button>
        </div>
    </div>
</template>

<script>
    import UsuarioMixins from '@/mixins/UsuarioMixins';

    export default {
        name: "EditarUsuarioCompoment",
        mixins: [UsuarioMixins],
        created() {
            if(sessionStorage.getItem('token') === null) {
                this.$router.push({ name: 'login'});  
            }   

            this.buscar(this.$route.params.id);
        }
    }
</script>
