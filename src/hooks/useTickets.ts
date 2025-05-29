import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Ticket } from '@/types';

export const useTickets = () =>
  useQuery<Ticket[]>(['tickets'], () => api.get('/tickets').then(r => r.data));

export const useCreateTicket = () => {
  const qc = useQueryClient();
  return useMutation((t: Partial<Ticket>) => api.post('/tickets', t), {
    onSuccess: () => qc.invalidateQueries(['tickets']),
  });
};

export const useUpdateTicket = () => {
  const qc = useQueryClient();
  return useMutation(
    ({ id, status }: { id: number; status: string }) => api.patch(`/tickets/${id}`, { status }),
    { onSuccess: () => qc.invalidateQueries(['tickets']) }
  );
};