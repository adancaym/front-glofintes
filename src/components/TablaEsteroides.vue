<template>
  <b-row>
    <b-col cols="12">
      <b-form-group>
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            class=""
            v-model="filter"
            type="search"
            placeholder="Escribe para buscar, (No enciendas ningun switch para hacer una busqueda general)"
          ></b-form-input>
          <b-input-group-append style="background-color:#e9ecef;">
            <b-form-checkbox-group
              class="ml-5"
              switches
              v-model="filterOn"
            >
              <b-form-checkbox
                size="sm"
                v-b-tooltip.hover :title="'Buscar en columna: ' +field.label"
                v-for="field in fields.filter( f => f.sortable)"
                :key="fields.indexOf(field)"
                :value="field.key">
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-input-group-append>
          <b-input-group-append>
            <b-button-group size="sm">
              <b-button v-b-tooltip.hover title="Limpiar filtro de busqueda" :disabled="!filter" @click="filter = ''">
                Limpiar
              </b-button>
              <slot name="btnUpdate"></slot>
              <slot name="btnCreate"></slot>
            </b-button-group>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>

    <b-col cols="12">
      <b-card>
        <b-table

          empty-text="No hay registros para mostrar"
          empty-filtered-text="No hay coincidencias en la busqueda"
          style="text-align: center"
          :items="items"
          :fields="getFields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :filter-function="filterFunction"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          show-empty
          responsive
          borderless
          sticky-header
          striped
          hover
        >
          <template v-for="(index, field) in fields.filter( f => f.formatter)" v-slot:[cell(field.key)]="scope">
            <div v-if="field.formatter" v-html="field.formatter(scope.unformatted)" :key="index"/>
          </template>

          <template v-for="(_, slotName) of $scopedSlots" v-slot:[slotName]="scope">
            <slot :name="slotName" v-bind="scope" ></slot>
          </template>
        </b-table>
      </b-card>
    </b-col>
    <b-col cols="12" class="text-right">
      <b-input-group size="sm">
        <b-input-group-prepend>
          <b-input-group-text class="small" v-b-tooltip.hover title="Elementos por página">
            Elementos por pagina
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-select
          v-model="perPage"
          :options="pageOptions"
        ></b-form-select>
      </b-input-group>
    </b-col>
    <b-col cols="12">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        size="sm"
        align="center"
      />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'TablaEsteroides',
  props: {
    items: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, 100],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  watch: {
    items () {
      this.totalRows = this.items.length
    }
  },
  computed: {
    sortOptions () {
      return this.fields.filter(f => f.sortable).map(f => ({
        text: f.label,
        value: f.key
      }))
    },
    getItems () {
      return this.items
    },
    getFields () {
      return this.fields.filter(f => this.filterOn.length > 0 ? this.filterOn.find(fi => fi === f.key) : f)
    },
    getTotalRows () {
      return this.totalRows
    }
  },
  mounted () {
    this.totalRows = this.items.length
    this.filter = ''
  },
  methods: {
    cell (key) {
      return 'cell(' + key + ')'
    },
    filterFunction (a, b) {
      const result = this.fields.map(header => {
        if (header.formatter) {
          return header.formatter(a[header.key]).toString().toUpperCase().includes(b.toString().toUpperCase())
        } else {
          if (a[header.key]) return a[header.key].toString().toUpperCase().includes(b.toString().toUpperCase())
        }
      })
      return result.filter(r => r !== undefined).reduce((a, b) => a || b)
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
<style>
.table > tbody {
  height: 200px !important;
  max-height: 200px !important;
  overflow-y: auto !important;
}

.input-group-prepend, .input-group-append {
  display: inline;
}

.custom-control-label {
  position: relative;
  margin-bottom: 12px;
  vertical-align: top;
}

.btn-group-custom:nth-child(1) > label {
  margin-left: 22px;
}

td > .btn-sm, td > .btn, td > .btn-group > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

th.wsm {
  width: 1% !important;
  text-align: center;
}
</style>
