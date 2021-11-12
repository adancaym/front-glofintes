export class Notifications {

  showText (text) {
    alert(text)
  }

  error (error) {
    let text = ''
    if (error.response && error.response.data.message) {
      text = error.response.data.message
    } else {
      text = error.message
    }
    alert(text)
  }

  confirm (title, onSuccess, onCancel) {
    if (confirm(title)) {
      onSuccess()
    } else {
      onCancel()
    }
  }
}
