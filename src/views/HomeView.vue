<template>
  <div>
    <nav class="navbar navbar-light bg-light menu_superior">
      <div class="container">
        <div>ERP Pedidos Fornecedor</div>
        <div class="navbar-nav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <button class="btn btn-sm btn-secondary" @click="logout()">Sair</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="d-flex">
      <div class="list-group menu_esquerdo">
        <router-link class="list-group-item" :to="{ name: 'usuario'}" exact-active-class="true">
          <i class="bi bi-person-vcard-fill">Usuário</i>
        </router-link>   
        <router-link class="list-group-item" :to="{ name: 'usuariofornecedor'}" exact-active-class="true">
          <i class="bi bi-people-fill">Usuário x Fornecedor</i>
        </router-link>     
        <router-link class="list-group-item" :to="{ name: 'fornecedor'}" exact-active-class="true">
          <i class="bi bi-person-fill-up">Fornecedores</i>
        </router-link>  
        <router-link class="list-group-item" :to="{ name: 'produto'}" exact-active-class="true">
          <i class="bi bi-cart-fill">Produtos</i>
        </router-link>  
        <router-link class="list-group-item" :to="{ name: 'pedido'}" exact-active-class="true">
          <i class="bi bi-bag-fill">Pedidos</i>
        </router-link>
      </div>

      <div class="container-fluid">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    import UsuarioMixins from '@/mixins/UsuarioMixins';

    export default {
        name: 'HomeView',
        mixins: [UsuarioMixins],
        created() {
          if(sessionStorage.getItem('token') === null) {
            this.$router.push({ name: 'login'});  
          }            
        }    
    }
</script>

<style scoped>
  .menu_superior {
    border-bottom: solid 1px #ccc;
  }

  .menu_esquerdo {
    border-right: solid 1px #ccc;
    width: 250px;
  }
</style>
