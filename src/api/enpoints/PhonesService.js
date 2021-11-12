import { Service } from '../core/Service'

export class PhonesService extends Service {
  constructor () {
    super('phones')
    this.fields = [
      {
        key: 'lada',
        label: 'lada',
        type: 'string'
      },
      {
        key: 'telefono',
        label: 'telefono',
        type: 'string'
      },
      {
        key: 'ext',
        label: 'ext',
        type: 'string'
      }
    ]
  }
}
