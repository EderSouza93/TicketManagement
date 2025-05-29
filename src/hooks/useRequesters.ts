import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Requester } from '@/types';

export const useRequesters = () =>
  useQuery<Requester[]>(['requesters'], () => api.get('/requesters').then(r => r.data));

export const useCreateRequester = () => {
  const qc = useQueryClient();
  return useMutation((r: Partial<Requester>) => api.post('/requesters', r), {
    onSuccess: () => qc.invalidateQueries(['requesters']),
  });
};

export const useDeleteRequester = () => {
  const qc = useQueryClient();
  return useMutation((id: number) => api.delete(`/requesters/${id}`), {
    onSuccess: () => qc.invalidateQueries(['requesters']),
  });
};