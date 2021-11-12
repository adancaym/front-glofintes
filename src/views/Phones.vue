<template>
  <Crud :service="$options.service"/>
</template>

<script>
import { PhonesService } from '../api/enpoints/PhonesService'
import Crud from '../components/Crud'

export default {
  name: 'Phones',
  components: { Crud },
  service: new PhonesService()
}
</script>

<style scoped>

</style>
