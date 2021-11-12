import { Service } from '../core/Service'

export class FileService extends Service {
  constructor () {
    super('files')
  }

  create (object, params, config) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = ({ target }) => {
        const fileDto = new FileCreateDto()
        fileDto.name = object.name
        fileDto.mime = object.type
        fileDto.b64 = target.result
        super.create(fileDto, params, config).then(fileInServer => {
          resolve(fileInServer)
        })
      }
      reader.readAsDataURL(object)
    })
  }

  createAndReturnUrl (object, params, config) {
    return this.create(object, params, config).then(file => {
      return this.endpoint.getUrlEndpointWithParams('/' + file.id)
    })
  }
}

export class FileCreateDto {
  constructor () {
    this.mime = null
    this.name = null
    this.b64 = null
  }
}

export class FileDocumentDto {
  constructor () {
    this.file = null
    this.document = null
  }
}
