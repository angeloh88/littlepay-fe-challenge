export type Transaction = {
    id: string;
    amount_in_cents: number;
    currency: string;
    type: "TRANSFER" | "TOPUP";
    status: string;
    created_at: string;
    destination_id: string;
};

export type TransactionsResponse = {
    status: string;
    message: string;
    pagination: {
        current_page: number;
        total_pages: number;
        total_items: number;
        items_per_page: number;
    };
    data: Transaction[];
};

export async function getTransactions(page = 1): Promise<TransactionsResponse> {
    const res = await fetch(`/api/v1/transactions?page=${page}`, {
        method: "GET",
        credentials: "include", // ✅ required
    });

    if (!res.ok) {
        throw new Error("Failed to fetch transactions");
    }

    return res.json();
}
