<template>
    <div>      
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">NOME</th>                    
                    <th scope="col">OBSERVACAO</th>                    
                    <th scope="">STATUS</th>                    
                </tr>
            </thead>
            <tbody>
                <tr> 
                    <td>{{nome}}</td>                                                                                                  
                    <td>                        
                        <input type="text" class="form-control" 
                            style="width: 350px;" 
                            :class="{'border-danger': classObservacao}"                             
                            v-model="observacao"/>
                    </td>
                    <td>                        
                        <select class="form-select" :class="{'border-danger': classStatus}" v-model="status">
                            <option value="" disabled selected>-- Selecione uma opção</option>
                            <option value="PEN">Pendente</option>
                            <option value="CON">Concluído</option>
                            <option value="CAN">Cancelado</option>     
                        </select>
                    </td>                    
                </tr>
                <tr>
                    <td colspan="3">
                        <button type="button" class="btn btn-primary" @click="editar(this.$route.params.id)">Salvar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import PedidoMixins from '@/mixins/PedidoMixins';

    export default {
        name: 'EditarPedidoComponent',
        mixins: [PedidoMixins],
        created() {
            this.buscar(this.$route.params.id);
        }    
    }
</script>