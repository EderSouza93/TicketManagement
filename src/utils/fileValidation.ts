
export const validateFiles = (
    files: FileList,
    maxTotalSize: number
): { isValid: boolean; errorMessage?: string; validFiles?: File[] } => {
    const selectedFiles = Array.from(files);
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > maxTotalSize) {
        return {
            isValid: false,
            errorMessage: "O tamanho total dos arquivos excede o limite permitido.",
            validFiles: [],
        };
    }

    return { isValid: true, validFiles: selectedFiles };
}