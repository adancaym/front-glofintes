import { Service } from '../core/Service'

export class ClientsService extends Service {
  constructor () {
    super('clients')
    this.fields = [
      {
        key: 'nombre',
        label: 'nombre',
        type: 'string'
      },
      {
        key: 'apellidoPaterno',
        label: 'apellidoPaterno',
        type: 'string'
      },
      {
        key: 'apellidoMaterno',
        label: 'apellidoMaterno',
        type: 'string'
      },
      {
        key: 'edad',
        label: 'edad',
        type: 'number'
      }
    ]
  }
}
