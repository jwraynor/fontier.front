export interface Client {
    id: number;
    hwid: string;
    name: string;
    active: boolean;
    lastSeen: string;
}

export interface Font {
    id: number;
    name: string;
    style: string;
    file_hash: string;
    file_type: string;
    file_path: string;
    created_at: string;
    updated_at: string;
}

export interface Library {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface Group {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface ClientActivity {
    date: string;
    activeClients: number;
}

export interface LibraryDistribution {
    libraryId: number;
    fontCount: number;
}

export type UploadFontResponse = Font | { filePath: string };
