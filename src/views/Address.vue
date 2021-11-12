<template>
  <Crud :service="$options.service"/>
</template>

<script>
import { AddressesService } from '../api/enpoints/AddressesService'
import Crud from '../components/Crud'

export default {
  name: 'Address',
  components: { Crud },
  service: new AddressesService()
}
</script>

<style scoped>

</style>
