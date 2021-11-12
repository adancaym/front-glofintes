<template>
  <b-carousel
    :id="id"
    fade
    indicators
  >
    <b-carousel-slide v-for="img in images" class="p-1">
      <template #img>
        <img :src="img" alt="" class="img-square">
      </template>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  name: 'CarrouselEsteroides',
  props: {
    images: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

.img-square {
  width: 100%;
  max-height: 500px !important;
  white-space: nowrap;
}

</style>
