<template>

  <Crud :service="$options.service"/>

</template>

<script>
import Crud from '../components/Crud'
import { ClientsService } from '../api/enpoints/ClientsService'

export default {
  service: new ClientsService(),
  name: 'Clients',
  components: { Crud }
}
</script>

<style scoped>

</style>
