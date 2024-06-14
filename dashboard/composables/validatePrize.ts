export function validPrizeKhN(name_kh?:string):string | any{
    if(!name_kh){
        return "is required";
    }
}
export function validPrizeEnN(name_en?:string):string | any{
    if(!name_en){
        return "is required";
    }
}
export function validPrizeImage(image: File|null): string | undefined {
    if (!image) return "is required";
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "tiff", "avif"]; // Add more image extensions if needed
    const fileExtension = image.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return "Invalid file type. Only image files are allowed.";
    }
    // Additional validation or processing logic can be added here if needed
  }