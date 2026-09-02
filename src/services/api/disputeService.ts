export interface DisputeItem {
  id: string;
  bookingId: string;
  customer: string;
  provider: string;
  reason: string;
  amount: number;
}

let localDisputes: DisputeItem[] = [
  {
    id: 'd-1',
    bookingId: 'bk-990',
    customer: 'Rohan Patil',
    provider: 'Santosh Kulkarni',
    reason: 'Plumber arrived 2 hours late and tap leak persisted.',
    amount: 350,
  },
];

export const disputeService = {
  async getDisputes(): Promise<DisputeItem[]> {
    return Promise.resolve([...localDisputes]);
  },

  async raiseDispute(bookingId: string, reason: string): Promise<DisputeItem> {
    const newDispute: DisputeItem = {
      id: `d-${Date.now().toString().slice(-4)}`,
      bookingId,
      customer: 'Aniket Sharma',
      provider: 'Service Provider',
      reason,
      amount: 499,
    };
    localDisputes = [newDispute, ...localDisputes];
    return Promise.resolve(newDispute);
  },

  async resolveDispute(disputeId: string, _action: 'refund' | 'payout'): Promise<boolean> {
    localDisputes = localDisputes.filter((d) => d.id !== disputeId);
    return Promise.resolve(true);
  },
};
