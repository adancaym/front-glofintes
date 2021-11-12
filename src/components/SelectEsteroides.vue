<template>
  <b-form-group :label="field.label">
    <b-form-select
        :value="getValue"
        @change="change"
        :options="options"
    />
  </b-form-group>
</template>

<script>
export default {
  name: "SelectEsteroides",
  props: {
    field: {
      type: Object,
      required: true
    },
    value: String
  },
  data: () => ({
    options: [],
  }),
  mounted() {
    this.field.options().then(options => {
      this.options = options;
    })
  },
  methods: {
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