
export const validateFiles = (
    files: FileList,
    maxTotalSize: number,
    maxFiles: number,
    currentFilesCount: number
): { isValid: boolean; errorMessage?: string; validFiles?: File[] } => {
    const selectedFiles = Array.from(files);

    if (currentFilesCount + selectedFiles.length > maxFiles) {
        return {
            isValid:false,
            errorMessage: `O número total de arquivos excede o limite permitido de ${maxFiles}.`,
            validFiles:[],
        }
    }
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > maxTotalSize) {
        return {
            isValid: false,
            errorMessage: "O tamanho total dos arquivos excede o limite permitido de 8M.",
            validFiles: [],
        };
    }

    return { isValid: true, validFiles: selectedFiles };
}