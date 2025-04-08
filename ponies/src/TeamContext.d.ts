declare module '../context/TeamContext' {
    import React from 'react';

    // Define the shape of the TeamContext value
    export interface TeamContextType {
        teamName: string;
        members: string[];
        addMember: (member: string) => void;
        removeMember: (member: string) => void;
    }

    // Export the context itself
    export const TeamContext: React.Context<TeamContextType>;

    // Export a provider component
    export const TeamProvider: React.FC<{ children: React.ReactNode }>;
}