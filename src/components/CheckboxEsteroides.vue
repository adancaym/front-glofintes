<template>
  <b-form-checkbox
      :checked="getValue"
      switch
      @change="change"
  >
    {{ field.label }}:
    <b>
      {{ field.formatter(getValue) }}
    </b>
  </b-form-checkbox>
</template>

<script>
export default {
  name: "CheckboxEsteroides",
    props: {
      field: {
        type: Object,
        required: true
      },
      value: Boolean
    },
    methods: {
      change: function (value) {
        this.$emit('input', value)
        this.$emit('change', value)
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