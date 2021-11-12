<template>
  <b-form-group :label="field.label" >
    <b-card>
      <v-color-picker
          style="width: 70%; margin-left: 15%"
          dot-size="25"
          show-swatches
          v-model="cValue"
          @input="change"
          swatches-max-height="200"
      ></v-color-picker>
      <b-card class="text-center mt-2" :style="{backgroundColor: getValue}">
      </b-card>
    </b-card>
  </b-form-group>
</template>

<script>
export default {
  name: "ColorEsteroides",
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
  mounted() {
    if (this.value) this.cValue = this.value
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