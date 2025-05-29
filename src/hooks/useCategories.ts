import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api';
import { Category } from '@/types';

export const useCategories = () =>
    useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: () => api.get('/categories').then(r => r.data),
    });

export const useCreateCategory = () => {
    const qc = useQueryClient();
    return useMutation((c: Partial<Category>) => api.post('/categories', c), {
        onSuccess: () => qc.invalidateQueries(['categories']),
    });
};

export const useDeleteCategory = () => {
    const qc = useQueryClient();
    return useMutation((id: number) => api.delete(`/categories/${id}`), {
        onSuccess: () => qc.invalidateQueries(['categories']),
    });
};