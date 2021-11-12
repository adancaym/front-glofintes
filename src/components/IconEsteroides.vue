<template>

  <b-form-group :label="field.label">
    <b-form-select
        :value="getValue"
        @change="change"
        :options="options"
    />
    <b-card class="text-center mt-2">
      <p style="font-size: 2em!important;" >
        <b-icon class="mt-5 mb-5" :icon="getValue"></b-icon>
      </p>
    </b-card>
  </b-form-group>
</template>

<script>
export default {
  name: "IconEsteroides",
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
    this.options = this.field.options();
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