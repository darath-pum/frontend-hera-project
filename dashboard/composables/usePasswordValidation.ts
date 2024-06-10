import { ref } from 'vue'
export function usePasswordValidation() {
  const isLengthValid = ref(false)
  const hasUppercase = ref(false)
  const hasLowercase = ref(false)
  const hasDigit = ref(false)
  const hasSpecialChar = ref(false)
  const showDialog = ref(false)

  const validatePassword = (password: string) => {
    isLengthValid.value = password.length >= 8
    hasUppercase.value = /[A-Z]/.test(password)
    hasLowercase.value = /[a-z]/.test(password)
    hasDigit.value = /\d/.test(password)
    hasSpecialChar.value = /[!@#$%^&*]/.test(password)
    
    showDialog.value = true
  }

  return {
    isLengthValid,
    hasUppercase,
    hasLowercase,
    hasDigit,
    hasSpecialChar,
   
    validatePassword
  }
}
