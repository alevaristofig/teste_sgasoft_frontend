<template>
    <div>
        <nav class="navbar navbar-light bg-light menu-superior">
            <div class="container">
                ERP
            </div>
        </nav>
        <div class="row mt-5">
            <div class="col-6 offset-3">
                <div class="card">
                    <p class="card-header">Entrar</p>
                    <div class="card-body">
                        <div class="mb-3">
                            <input type="email" class="form-control" placeholder="E-mail" v-model="emailLogin">
                        </div>
                        <div class="mb-3">
                            <input type="password" class="form-control" placeholder="Senha" v-model="password">
                        </div>
                        <button class="btn btn-primary" @click="logar()">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UsuarioMixins from '@/mixins/UsuarioMixins';

    export default {
        name: 'LoginView',
        mixins: [UsuarioMixins]
    }
</script>