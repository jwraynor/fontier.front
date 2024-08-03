import {useQuery, useMutation, UseQueryResult, UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {clientService, fontService, libraryService, groupService, analyticsService} from '../api/services';
import {Client, Library, Font, Group, ClientActivity, LibraryDistribution, UploadFontResponse} from '../api/types';

export const useDatabase = () => {
    const queryClient = useQueryClient();
    // Client queries
    const useClients = (): UseQueryResult<Client[], Error> => {
        return useQuery({
            queryKey: ['clients'],
            queryFn: () => clientService.getClients().then(res => res.data)
        });
    };

    const useClient = (id: string): UseQueryResult<Client, Error> => {
        return useQuery({
            queryKey: ['client', id],
            queryFn: () => clientService.getClientById(id).then(res => res.data)
        });
    };

    const useClientLibraries = (id: string): UseQueryResult<Library[], Error> => {
        return useQuery({
            queryKey: ['clientLibraries', id],
            queryFn: () => clientService.getClientLibraries(id).then(res => res.data)
        });
    };

    const useClientFonts = (id: string): UseQueryResult<Font[], Error> => {
        return useQuery({
            queryKey: ['clientFonts', id],
            queryFn: () => clientService.getClientFonts(id).then(res => res.data)
        });
    };

    const useClientGroups = (id: string): UseQueryResult<Group[], Error> => {
        return useQuery({
            queryKey: ['clientGroups', id],
            queryFn: () => clientService.getClientGroups(id).then(res => res.data)
        });
    };

    // Font queries
    const useFonts = (): UseQueryResult<Font[], Error> => {
        return useQuery({
            queryKey: ['fonts'],
            queryFn: () => fontService.getFonts().then(res => res.data)
        });
    };


    const useFont = (id: number): UseQueryResult<Font, Error> => {
        return useQuery({
            queryKey: ['font', id],
            queryFn: () => fontService.getFontById(id).then(res => res.data)
        });
    };

    // Library queries
    const useLibraries = (): UseQueryResult<Library[], Error> => {
        return useQuery({
            queryKey: ['libraries'],
            queryFn: () => libraryService.getLibraries().then(res => res.data)
        });
    };

    const useLibrary = (id: number): UseQueryResult<Library, Error> => {
        return useQuery({
            queryKey: ['library', id],
            queryFn: () => libraryService.getLibraryById(id).then(res => res.data)
        });
    };

    // Group queries
    const useGroups = (): UseQueryResult<Group[], Error> => {
        return useQuery({
            queryKey: ['groups'],
            queryFn: () => groupService.getGroups().then(res => res.data)
        });
    };

    const useGroup = (id: number): UseQueryResult<Group, Error> => {
        return useQuery({
            queryKey: ['group', id],
            queryFn: () => groupService.getGroupById(id).then(res => res.data)
        });
    };

    // Analytics queries
    const useClientActivity = (): UseQueryResult<ClientActivity[], Error> => {
        return useQuery({
            queryKey: ['clientActivity'],
            queryFn: () => analyticsService.getClientActivity().then(res => res.data)
        });
    };

    const useLibraryDistribution = (): UseQueryResult<LibraryDistribution[], Error> => {
        return useQuery({
            queryKey: ['libraryDistribution'],
            queryFn: () => analyticsService.getLibraryDistribution().then(res => res.data)
        });
    };

    const useAssignLibraryToClient = (): UseMutationResult<void, Error, { clientId: string; libraryId: number }> => {
        return useMutation({
            mutationFn: ({clientId, libraryId}) =>
                clientService.assignLibraryToClient(clientId, libraryId).then(res => res.data),
            onSuccess: async (_, {clientId}) => {
                await queryClient.invalidateQueries({queryKey: ['clientLibraries', clientId]});
            },
        });
    };

    const useUnassignLibraryFromClient = (): UseMutationResult<void, Error, {
        clientId: string;
        libraryId: number
    }> => {
        return useMutation({
            mutationFn: ({clientId, libraryId}) =>
                clientService.unassignLibraryFromClient(clientId, libraryId).then(res => res.data),
            onSuccess: (_, {clientId}) => {
                queryClient.invalidateQueries({queryKey: ['clientLibraries', clientId]}).then(); //Appease the linter gods
            },
        });
    };

    const useUploadFont = (): UseMutationResult<UploadFontResponse, Error, FormData> => {
        return useMutation({
            mutationFn: (formData) => fontService.uploadFont(formData).then(res => res.data),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['fonts']}).then(); //Appease the linter gods
            }
        });
    }
    const useAssignFontToClient = (): UseMutationResult<void, Error, { clientId: string; fontId: number }> => {
        return useMutation({
            mutationFn: ({clientId, fontId}) =>
                clientService.assignFontToClient(clientId, fontId).then(res => res.data),
            onSuccess: (_, {clientId}) => {
                queryClient.invalidateQueries({queryKey: ['clientFonts', clientId]}).then(); //Appease the linter gods
            },
        });
    };

    const useUnassignFontFromClient = (): UseMutationResult<void, Error, { clientId: string; fontId: number }> => {
        return useMutation({
            mutationFn: ({clientId, fontId}) =>
                clientService.unassignFontFromClient(clientId, fontId).then(res => res.data),
            onSuccess: (_, {clientId}) => {
                queryClient.invalidateQueries({queryKey: ['clientFonts', clientId]}).then(); //Appease the linter gods
            },
        });
    };

    const useAssignGroupToClient = (): UseMutationResult<void, Error, { clientId: string; groupId: number }> => {
        return useMutation({
            mutationFn: ({clientId, groupId}) =>
                clientService.assignGroupToClient(clientId, groupId).then(res => res.data),
            onSuccess: (_, {clientId}) => {
                queryClient.invalidateQueries({queryKey: ['clientGroups', clientId]}).then(); //Appease the linter gods
            },
        });
    };

    const useUnassignGroupFromClient = (): UseMutationResult<void, Error, { clientId: string; groupId: number }> => {
        return useMutation({
            mutationFn: ({clientId, groupId}) =>
                clientService.unassignGroupFromClient(clientId, groupId).then(res => res.data),
            onSuccess: (_, {clientId}) => {
                queryClient.invalidateQueries({queryKey: ['clientGroups', clientId]}).then(); //Appease the linter gods
            },
        });
    };

    const useCreateLibrary = (): UseMutationResult<Library, Error, { name: string; description: string }> => {
        return useMutation({
            mutationFn: (libraryData) => libraryService.createLibrary(libraryData).then(res => res.data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['libraries'] }).then();
            },
        });
    };

    const useUpdateLibrary = (): UseMutationResult<Library, Error, { id: number; name: string; description: string }> => {
        return useMutation({
            mutationFn: (libraryData) => libraryService.updateLibrary(libraryData.id, libraryData).then(res => res.data),
            onSuccess: (updatedLibrary) => {
                queryClient.invalidateQueries({ queryKey: ['libraries'] }).then();
                queryClient.invalidateQueries({ queryKey: ['library', updatedLibrary.id] }).then();
            },
        });
    };

    const useAssignFontToLibrary = (): UseMutationResult<void, Error, { libraryId: number; fontId: number }> => {
        return useMutation({
            mutationFn: ({ libraryId, fontId }) =>
                libraryService.addFontToLibrary(libraryId, fontId).then(res => res.data),
            onSuccess: (_, { libraryId }) => {
                queryClient.invalidateQueries({ queryKey: ['libraryFonts', libraryId] }).then();
            },
        });
    };

    const useUnassignFontFromLibrary = (): UseMutationResult<void, Error, { libraryId: number; fontId: number }> => {
        return useMutation({
            mutationFn: ({ libraryId, fontId }) =>
                libraryService.removeFontFromLibrary(libraryId, fontId).then(res => res.data),
            onSuccess: (_, { libraryId }) => {
                queryClient.invalidateQueries({ queryKey: ['libraryFonts', libraryId] }).then();
            },
        });
    };

    const useLibraryFonts = (id: number): UseQueryResult<Font[], Error> => {
        return useQuery({
            queryKey: ['libraryFonts', id],
            queryFn: () => libraryService.getLibraryFonts(id).then(res => res.data)
        });
    };


    return {
        useClients,
        useClient,
        useClientLibraries,
        useClientFonts,
        useClientGroups,
        useFonts,
        useFont,
        useLibraries,
        useLibrary,
        useGroups,
        useGroup,
        useUploadFont,
        useClientActivity,
        useLibraryDistribution,
        useAssignLibraryToClient,
        useUnassignLibraryFromClient,
        useAssignFontToClient,
        useUnassignFontFromClient,
        useAssignGroupToClient,
        useUnassignGroupFromClient,
        useCreateLibrary,
        useUpdateLibrary,
        useAssignFontToLibrary,
        useUnassignFontFromLibrary,
        useLibraryFonts,
    };
};

export default useDatabase;