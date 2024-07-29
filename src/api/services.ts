import api from './axios';
import {Client, Font, Library, Group, ClientActivity, LibraryDistribution} from './types';
import {AxiosResponse} from 'axios';

export const clientService = {
    getClients: (): Promise<AxiosResponse<Client[]>> => api.get('/clients'),
    getClientById: (id: string): Promise<AxiosResponse<Client>> => api.get(`/clients/${id}`),
    getClientLibraries: (id: string): Promise<AxiosResponse<Library[]>> => api.get(`/clients/${id}/libraries`),
    getClientFonts: (id: string): Promise<AxiosResponse<Font[]>> => api.get(`/clients/${id}/fonts`),
    getClientGroups: (id: string): Promise<AxiosResponse<Group[]>> => api.get(`/clients/${id}/groups`),
    assignLibraryToClient: (clientId: string, libraryId: number): Promise<AxiosResponse<void>> =>
        api.post(`/clients/${clientId}/libraries`, {libraryId}),
    unassignLibraryFromClient: (clientId: string, libraryId: number): Promise<AxiosResponse<void>> =>
        api.delete(`/clients/${clientId}/libraries/${libraryId}`),
    assignFontToClient: (clientId: string, fontId: number): Promise<AxiosResponse<void>> =>
        api.post(`/clients/${clientId}/fonts`, {fontId}),
    unassignFontFromClient: (clientId: string, fontId: number): Promise<AxiosResponse<void>> =>
        api.delete(`/clients/${clientId}/fonts/${fontId}`),
    assignGroupToClient: (clientId: string, groupId: number): Promise<AxiosResponse<void>> =>
        api.post(`/clients/${clientId}/groups`, {groupId}),
    unassignGroupFromClient: (clientId: string, groupId: number): Promise<AxiosResponse<void>> =>
        api.delete(`/clients/${clientId}/groups/${groupId}`),
};

export const fontService = {
    getFonts: (): Promise<AxiosResponse<Font[]>> => api.get('/fonts'),
    getFontById: (id: number): Promise<AxiosResponse<Font>> => api.get(`/fonts/${id}`),
    createFont: (fontData: Omit<Font, 'id' | 'createdAt' | 'updatedAt'>): Promise<AxiosResponse<Font>> => api.post('/fonts', fontData),
    uploadFont: (formData: FormData) => api.post<{ filePath: string }>(`/fonts`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
};

export const libraryService = {
    getLibraries: (): Promise<AxiosResponse<Library[]>> => api.get('/libraries'),
    getLibraryById: (id: number): Promise<AxiosResponse<Library>> => api.get(`/libraries/${id}`),
    createLibrary: (libraryData: Omit<Library, 'id' | 'createdAt' | 'updatedAt'>): Promise<AxiosResponse<Library>> => api.post('/libraries', libraryData),
    addFontToLibrary: (libraryId: number, fontId: number): Promise<AxiosResponse<void>> => api.post(`/libraries/${libraryId}/fonts`, {fontId}),
};

export const groupService = {
    getGroups: (): Promise<AxiosResponse<Group[]>> => api.get('/groups'),
    getGroupById: (id: number): Promise<AxiosResponse<Group>> => api.get(`/groups/${id}`),
    createGroup: (groupData: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>): Promise<AxiosResponse<Group>> => api.post('/groups', groupData),
    addClientToGroup: (groupId: number, clientId: string): Promise<AxiosResponse<void>> => api.post(`/groups/${groupId}/clients`, {clientId}),
    removeClientFromGroup: (groupId: number, clientId: string): Promise<AxiosResponse<void>> => api.delete(`/groups/${groupId}/clients/${clientId}`),
    addLibraryToGroup: (groupId: number, libraryId: number): Promise<AxiosResponse<void>> => api.post(`/groups/${groupId}/libraries`, {libraryId}),
    addFontToGroup: (groupId: number, fontId: number): Promise<AxiosResponse<void>> => api.post(`/groups/${groupId}/fonts`, {fontId}),
};

export const analyticsService = {
    getClientActivity: (): Promise<AxiosResponse<ClientActivity[]>> => api.get('/analytics/client-activity'),
    getLibraryDistribution: (): Promise<AxiosResponse<LibraryDistribution[]>> => api.get('/analytics/library-distribution'),
};