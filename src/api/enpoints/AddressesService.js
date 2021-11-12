import { Service } from '../core/Service'

export class AddressesService extends Service {
  constructor () {
    super('addresses')
    this.fields = [
      {
        key: 'calle',
        label: 'calle',
        type: 'string'
      },
      {
        key: 'numeroInt',
        label: 'numeroInt',
        type: 'string'
      },
      {
        key: 'numeroExt',
        label: 'numeroExt',
        type: 'string'
      },
      {
        key: 'colonia',
        label: 'colonia',
        type: 'string'
      },
      {
        key: 'cp',
        label: 'cp',
        type: 'string'
      },
      {
        key: 'estado',
        label: 'estado',
        type: 'string'
      }
    ]
  }
}
