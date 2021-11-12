<template>
  <b-card
    :header="$route.matched[$route.matched.length-1].meta.label"
    class="mb-5">
    <b-card-text>
      <slot name="messages"></slot>
    </b-card-text>
    <b-card-body>
      <TablaEsteroides
        :items.sync="items"
        :fields.sync="service.fields">
        <template #btnCreate>
          <b-button v-b-modal.modal-create variant="primary" v-b-tooltip.hover title="Agregar un elemento nuevo">
            <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
          </b-button>
          <b-modal
            id="modal-create"
            size="lg"
            title="Crear"
            hide-footer
          >
            <FormEsteroides :service="service"/>
          </b-modal>
        </template>
        <template #btnUpdate>
          <b-button v-on:click="lista()" variant="primary" v-b-tooltip.hover title="Refrescar la tabla de elementos">
            <b-icon-arrow-repeat></b-icon-arrow-repeat>
          </b-button>
        </template>

        <template v-for="(_, slotName) of $scopedSlots" v-slot:[slotName]="scope">
          <slot v-if="slotName==='cell(update)'" :name="slotName" v-bind="scope"></slot>
        </template>

        <template v-for="field of service.fields" v-slot="scope">
          <slot :name="'cell('+field.key+')'" v-bind="scope"></slot>
        </template>

        <template #cell(id)="{item}">
          <b :id="item.id">
            {{ item.id }}
          </b>
          <b-tooltip :target="item.id" placement="bottom">
            <p>Fecha de creación: <b>{{ new Date(item.createdAt).toLocaleString() }}</b></p>
            <p>Fecha de actualización: <b>{{ new Date(item.updatedAt).toLocaleString() }}</b></p>
          </b-tooltip>

        </template>

        <template v-slot:cell(actions)="{item}">

          <b-button-group>
            <b-button variant="info" v-b-modal="'modal-'+item.id">
              <b-icon-pencil-fill></b-icon-pencil-fill>
            </b-button>

            <b-button variant="danger" v-on:click="remove(item.id)" v-b-tooltip.hover title="Eliminar el elemento">
              <b-icon-trash-fill/>
            </b-button>
          </b-button-group>
          <b-modal
            :id="'modal-'+item.id"
            title="Actualizar"
            hide-footer
          >
            <FormEsteroides v-model="item.id" :service="service"/>
          </b-modal>
        </template>
      </TablaEsteroides>

    </b-card-body>
  </b-card>

</template>

<script>
import TablaEsteroides from '../components/TablaEsteroides'
import FormEsteroides from '../components/FormEsteroides'

export default {
  name: 'Crud',
  components: {
    FormEsteroides,
    TablaEsteroides
  },
  props: {
    service: {
      type: Object
    },
    query: Object,
  },
  data: () => ({
    items: []
  }),
  methods: {
    remove (id) {
      this.service.remove(id).then((removed) => {
        if (removed) {
          this.lista()
        }
      })
    },
    lista () {
      this.items = []
      this.service.list(this.query).then((items) => {
        this.items = items
      })
    }
  },
  created () {
    this.service.fields.unshift({
      key: 'id',
      class: 'wsm',
      label: 'Identificador',
      type: 'none'
    })
    this.service.fields.push({
      key: 'actions',
      label: 'Acciones',
      class: 'wsm',
      type: 'none',
      sortable: false
    })

    this.lista()
    this.$root.$on('refresh', () => {
      this.lista()
      this.$root.$emit('bv::hide::modal', 'modal-' + this.id)
      this.$root.$emit('bv::hide::modal', 'modal-create')
    })
  }
}
</script>

<style>

</style>
