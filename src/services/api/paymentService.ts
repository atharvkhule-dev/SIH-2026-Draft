export interface EarningsSummary {
  totalEarningsThisMonth: number;
  availableToWithdraw: number;
  pendingEscrow: number;
}

export const paymentService = {
  async getEarningsSummary(_providerId: string): Promise<EarningsSummary> {
    return Promise.resolve({
      totalEarningsThisMonth: 18450,
      availableToWithdraw: 17250,
      pendingEscrow: 1200,
    });
  },

  async requestWithdrawal(_providerId: string, amount: number): Promise<{ success: boolean; transactionId: string }> {
    return Promise.resolve({
      success: true,
      transactionId: `TXN-${Date.now().toString().slice(-6)}`,
    });
  },
};
