export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface SalesforceUser {
    title?: string;
    rols: "Admin" | string;
    companyCommercialName: string;
    companyBusinessName?: string;
    companyId: string;
    email: string;
    name: string;
    id: string;
    tiers: {
        tier_5: {
            feePercentage: number;
            amount: number;
        };
        tier_4: {
            feePercentage: number;
            amount: number;
        };
        tier_3: {
            feePercentage: number;
            amount: number;
        };
        tier_2: {
            feePercentage: number;
            amount: number;
        };
        tier_1: {
            feePercentage: number;
            amount: number;
        };
    };
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        salesforceUser: SalesforceUser;
    };
    flash: {
        success?: string;
        error?: string;
    };
    publishablePendingCount: number; // Updated variable name
};
