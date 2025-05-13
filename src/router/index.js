import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from '../views/HomeView.vue';
import UsuarioCompoment from '@/components/usuarios/UsuarioCompoment.vue';
import FornecedoresComponent from '@/components/fornecedores/FornecedoresComponent.vue';
import ProdutosComponent from '@/components/produtos/ProdutosComponent.vue';
import PedidosCompoment from '@/components/pedidos/PedidosCompoment.vue';
import EditarUsuarioCompoment from '@/components/usuarios/EditarUsuarioCompoment.vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        children: [
            {
                path: 'usuario',
                component: UsuarioCompoment,
                name: 'usuario'
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
                path: 'produto',
                component: ProdutosComponent,
                name: 'produto'
            },
            {
                path: 'pedido',
                component: PedidosCompoment,
                name: 'pedido'
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;