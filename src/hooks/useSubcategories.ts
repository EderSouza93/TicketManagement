import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Subcategory } from '@/types';

export const useSubcategories = () =>
  useQuery<Subcategory[]>(['subcategories'], () => api.get('/subcategories').then(r => r.data));

export const useCreateSubcategory = () => {
  const qc = useQueryClient();
  return useMutation((s: Partial<Subcategory>) => api.post('/subcategories', s), {
    onSuccess: () => qc.invalidateQueries(['subcategories']),
  });
};

export const useDeleteSubcategory = () => {
  const qc = useQueryClient();
  return useMutation((id: number) => api.delete(`/subcategories/${id}`), {
    onSuccess: () => qc.invalidateQueries(['subcategories']),
  });
};