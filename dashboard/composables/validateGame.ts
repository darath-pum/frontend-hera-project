export function validTitle(title?: string): string | any {
  if (!title) {
    return "is required";
  }
}
export function validDescription(descrition?: string): string | any {
  if (!descrition) {
    return "is required";
  }
}
export function validGameIcon(img: File | null): string | undefined {
  if (!img) return "Game icon is required";
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "tiff", "avif"]; // Add more image extensions if needed
  const fileExtension = img.name.split(".").pop()?.toLowerCase();
  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    return "Invalid file type. Only image files are allowed.";
  }
  // Additional validation or processing logic can be added here if needed
}
export function validGamIconEdit(img: File | null): string | undefined {
  if (img) {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "tiff", "avif"]; // Add more image extensions if needed
    const fileExtension = img.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return "Invalid file type. Only image files are allowed.";
    }
  }
  // Additional validation or processing logic can be added here if needed
}
export function validGame(game: File | null): string | undefined {
  if (!game) return "Game file is required";
  const allowedExtensions = ["zip", "rar"];
  const fileExtension = game.name.split(".").pop()?.toLowerCase();

  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    return "Invalid file type. Only .zip and .rar files are allowed";
  }
}
export function validGameEdit(game?: File): string | undefined {
  if (game) {
    const allowedExtensions = ["zip", "rar"];
    const fileExtension = game.name.split(".").pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return "Invalid file type. Only .zip and .rar files are allowed";
    }
  }
}
