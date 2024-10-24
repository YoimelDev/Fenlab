export interface Projects {
    data: Project[];
    meta: Meta;
}

export interface Project {
    id:          string;
    name:        string;
    modelType:   ModelType;
    description: string;
    _count:      Count;
    status:      Status;
    createdAt:   Date;
}

interface Count {
    projectAssets: number;
}

enum ModelType {
    NPL = 'NPL',
    Reo = 'REO',
}

enum Status {
    AnálisisCompleto = 'Análisis completo',
    SinEmpezar = 'Sin empezar',
}

interface Meta {
    currentPage: number;
    perPage:     number;
    totalItems:  number;
    totalPages:  number;
}
