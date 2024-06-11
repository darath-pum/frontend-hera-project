export function validTitle(title?:string):string | any{
    if(!title){
        return "is required";
    }
}
export function validDescription(desc?:string):string | any{
    if(!desc){
        return "is required";
    }
}
export function validCpImage(image?: File): string | undefined {
    if (!image) return "is required";
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "tiff", "avif"]; // Add more image extensions if needed
    const fileExtension = image.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return "Invalid file type. Only image files are allowed.";
    }
    // Additional validation or processing logic can be added here if needed
  }
  export function validateDate(date?: string): string | undefined {
    if (!date) return "is required";
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date))
      return "Invalid date format. Please use the format YYYY-MM-DD";
    return;
  }
export function validCpImageEdit(image?: File): string | undefined {
    if (image) {
      const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "tiff", "avif"]; // Add more image extensions if needed
      const fileExtension = image.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        return "Invalid file type. Only image files are allowed.";
      }
      
    }
    // Additional validation or processing logic can be added here if needed
  }
