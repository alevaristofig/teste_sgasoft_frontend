import { createRouter, createWebHashHistory } from "vue-router";

import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import UsuarioCompoment from '@/components/usuarios/UsuarioCompoment.vue';
import FornecedoresComponent from '@/components/fornecedores/FornecedoresComponent.vue';
import ProdutosComponent from '@/components/produtos/ProdutosComponent.vue';
import PedidosCompoment from '@/components/pedidos/PedidosCompoment.vue';
import EditarUsuarioCompoment from '@/components/usuarios/EditarUsuarioCompoment.vue';
import CadastroUsuarioComponent from '@/components/usuarios/CadastroUsuarioComponent.vue';
import CadastroFornecedorComponent from '@/components/fornecedores/CadastroFornecedorComponent';
import EditarFornecedorComponent from '@/components/fornecedores/EditarFornecedorComponent';
import CadastroProdutoCompoment from '@/components/produtos/CadastroProdutoCompoment.vue';
import EditarProdutoComponent from '@/components/produtos/EditarProdutoComponent.vue';
import UsuarioFornecedorComponent from '@/components/usuarios/UsuarioFornecedorComponent.vue';
import CarrinhoComponent from '@/components/pedidos/CarrinhoComponent.vue';
import ListaPedidosComponent from '@/components/pedidos/ListaPedidosComponent.vue';
import EditarPedidoComponent from "@/components/pedidos/EditarPedidoComponent.vue";
import FornecedorPedidoComponent from '@/components/fornecedores/FornecedorPedidoComponent';

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        children: [
            {
                path: 'usuario',
                component: UsuarioCompoment,
                name: 'usuario',                
            },
            {
                path: 'usuariofornecedor',
                component: UsuarioFornecedorComponent,
                name: 'usuariofornecedor'
            },
            {
                path: 'cadastrousuario',
                component: CadastroUsuarioComponent,
                name: 'cadastrousuario'
            },
            {
                path: 'usuario/:id',
                component: EditarUsuarioCompoment,
                name: 'editarusuario'
            },
            {
                path: 'fornecedor',
                component: FornecedoresComponent,
                name: 'fornecedor'
            },
             {
                path: 'cadastrofornecedor',
                component: CadastroFornecedorComponent,
                name: 'cadastrofornecedor'
            },
            {
                path: 'fornecedor/:id',
                component: EditarFornecedorComponent,
                name: 'editarfornecedor'
            },
            {
                path: 'produto',
                component: ProdutosComponent,
                name: 'produto'
            },
            {
                path: 'cadastroproduto',
                component: CadastroProdutoCompoment,
                name: 'cadastroproduto'
            },
            {
                path: 'produto/:id',
                component: EditarProdutoComponent,
                name: 'editarproduto'
            },
            {
                path: 'pedido',
                component: PedidosCompoment,
                name: 'pedido'
            },
            {
                path: 'carrinho',
                component: CarrinhoComponent,
                name: 'carrinho'
            },
            {
                path: 'listapedido',
                component: ListaPedidosComponent,
                name: 'listapedido'
            },
            {
                path: 'pedido/:id',
                component: EditarPedidoComponent,
                name: 'editarpedido'
            },
            {
                path: 'fornecedorpedido/:cnpj',
                component: FornecedorPedidoComponent,
                name: 'fornecedorpedido'
            }
        ]
    },
    {
        path: '/login',
        component: LoginView,
        name: 'login'
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;