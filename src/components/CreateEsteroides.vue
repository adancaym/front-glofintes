<template>
  <FormEsteroides ref="subForm" :service="field.service" :show-btn-save="false" v-model="value"/>
</template>
<script>
export default {
  name: "CreateEsteroides",
  components: {
    FormEsteroides: () => import('./FormEsteroides')
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    value: String
  },
  data: () => ({
    cValue: null,
  }),
  methods: {
    async save(){
      return this.$refs.subForm.guardar().then(value => {
        this.change(value)
      })
    },
    change: function (value) {
      this.$emit('input', value)
    }
  },
  computed: {
    getValue() {
      return this.value;
    }
  }
}
</script>

<style scoped>

</style>