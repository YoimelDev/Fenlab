export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
}

export interface SalesforceUser {
    title?: string
    rols: string
    companyCommercialName: string
    companyBusinessName?: string
    companyId: string
    email: string
    name: string
    id: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
        salesforceUser: SalesforceUser
    }
}
