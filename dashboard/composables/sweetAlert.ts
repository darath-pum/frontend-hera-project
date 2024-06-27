import Swal from 'sweetalert2'

export function swAlert(icon: string, title: string, text: string, timer: number) {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: timer
  })
}