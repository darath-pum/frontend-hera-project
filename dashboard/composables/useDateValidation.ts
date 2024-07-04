import { ref } from "vue";
import Swal from "sweetalert2";
export function useDateValidation() {
  const minDate = new Date("2020-01-01");
  const currentDate = new Date();
  const fromDateErr = ref(false);
  const toDateErr = ref(false);

  const validateFromDate = (
    fromDate: string
  ): { valid?: boolean; message?: string } => {
    if (!fromDate) {
      fromDateErr.value = true;
      return {
        valid: false,
        message: '"From" date is required or Invalid.',
      };
    }
    const from = new Date(fromDate);
    if (from < minDate) {
      fromDateErr.value = true;
      return {
        valid: false,
        message: 'The "From" date cannot be later than January 1, 2020.',
      };
    }

    fromDateErr.value = false;
    return { valid: true };
  };

  const validateToDate = (
    toDate: string
  ): { valid?: boolean; message?: string } => {
    if (!toDate) {
      toDateErr.value = true;
      return {
        valid: false,
        message: '"To" date is required.',
      };
    }

    const to = new Date(toDate);

    if (to < minDate) {
      toDateErr.value = true;
      return {
        valid: false,
        message: 'The "To" date cannot be later than January 1, 2020.',
      };
    }

    if (to > currentDate) {
      toDateErr.value = true;
      return {
        valid: false,
        message: 'The "To" date cannot be earlier than the current date.',
      };
    }
    toDateErr.value = false;
    return { valid: true };
  };
  const validateDates = (
    fromDate: string,
    toDate: string
  ): { validFromDate?: boolean; validToDate?: boolean; message?: string } => {
    const fromValidation = validateFromDate(fromDate);
    const toValidation = validateToDate(toDate);

    if (!fromValidation.valid || !toValidation.valid) {
      return {
        validFromDate: fromValidation.valid,
        validToDate: toValidation.valid,
        message: fromValidation.message || toValidation.message,
      };
    }
    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (from > to) {
      fromDateErr.value = true;
      toDateErr.value = true;
      return {
        validFromDate: false,
        validToDate: false,
        message:
          "The 'From' date cannot be earlier than the 'To' date, and the 'To' date cannot be later than the 'From' date.",
      };
    }

    return { validFromDate: true, validToDate: true };
  };

  // Function to show the SweetAlert2 message
  const showAlert = (message: string) => {
    Swal.fire({
      text: message,
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "black",
    });
  };

  return {
    toDateErr,
    fromDateErr,
    validateFromDate,
    validateToDate,
    validateDates,
    showAlert,
  };
}
