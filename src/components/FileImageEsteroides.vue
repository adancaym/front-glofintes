<template>
  <b-form-group :label="field.label">
    <b-form-file
        @input="uploadFile"
    ></b-form-file>
    <b-card class="mt-3">
      <b-carousel
          v-if="value && getValue.length > 0"
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000;"
          fade
          indicators
      >
        <b-carousel-slide
            v-for="img in getValue"
            :img-src="img"
        ></b-carousel-slide>
      </b-carousel>
      <b-alert class="mt-3 text-center" v-else show variant="info">No se han cargado imagenes</b-alert>
      <b-list-group>
        <b-list-group-item v-for="img in value">
          <span class="float-left">{{ value.indexOf(img) }}</span>
          <b-button variant="danger" class="float-right" @click="removeImage(img)"><b-icon-trash-fill></b-icon-trash-fill></b-button>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-form-group>
</template>

<script>

import { FileService } from '../api/enpoints/FileService'

export default {
  name: "FileImageEsteroides",
  fileService: new FileService(),
  props: {
    field: {
      type: Object,
      required: true
    },
    value: Array
  },
  data: () => ({
    cValue: [],
  }),
  mounted() {
    this.cValue = this.value ? this.value : [];
  },
  methods: {
    removeImage(img) {
      this.cValue = this.cValue.filter(e => e !== img)
      this.$emit('input', this.cValue)
    },
    uploadFile(file) {
      console.log(file)
      this.$options.fileService.createAndReturnUrl(file).then(url => {
        this.cValue.push(url);
        this.$emit('input', this.cValue)
      })
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
