export class ServiceHtmlHelper {
  arrayToListHtml (value) {
    if (value.length > 0) { return '<ul>' + value.map(grupo => '<li>' + grupo.name + '</li>').join('') + '</ul>' } else { return '<b>No hay asignaciones</b>' }
  }

  booleanToHuman (v) {
    return v ? 'Si' : 'No'
  }

  objectName (v) {
    return v.name
  }

  currency (v) {
    return '$' + parseFloat(v).toFixed(2)
  }

  percent (v) {
    return parseFloat(v).toFixed(2) + ' %'
  }

  size (v) {
    if (v) return Array.from(v).length + ' elementos'
    else return '0 elementos'
  }
}
