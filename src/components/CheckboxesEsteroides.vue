<template>

  <b-form-group
      :label="field.label"
      v-if="field.options !== null"
  >
    <b-input-group>
      <b-input v-model="filter" placeholder="Buscar en la lista" class="mb-2"></b-input>
    </b-input-group>
    <b-card style="height: 150px; overflow-y: auto">
      <b-form-checkbox-group
          v-if="getOptions.length > 0"
          @change="change"
          v-model="cValue"
          :options="getOptions"
          switches
          stacked
      />
      <b-alert v-else show variant="info"> Sin opciones</b-alert>
    </b-card>
  </b-form-group>
  <b-form-group v-else>
    <b-alert show variant="info"> No definiste la funcion de options</b-alert>
  </b-form-group>
</template>

<script>
export default {
  name: "CheckboxesEsteroides",
  props: {
    field: {
      type: Object,
      required: true
    },
    value: Array
  },
  data: () => ({
    options: [],
    cValue: [],
    filter: '',
  }),
  mounted() {
    if (this.field.options) {
      this.field.options().then(options => {
        this.options = options;
      });
    }
    if (this.value) this.cValue = this.value;
  },
  methods: {
    change: function (value) {
      console.log(this.cValue)
      this.$emit('input', this.cValue)
    },
    getChecked(value) {
      return !!this.cValue.find(o => o === value)
    },
  },
  computed: {
    getOptions() {
      if (this.filter === '') return this.options;
      else return this.options.filter(o => {
        return o.text.toUpperCase().includes(this.filter.toUpperCase())
      })
    },
    getValue() {
      return this.value;
    }
  }
}
</script>

<style scoped>

</style>