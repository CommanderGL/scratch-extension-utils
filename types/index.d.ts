export type ScratchBlockArgument = {
    type: "string" | "number" | "angle" | "Boolean" | "color" | "matrix" | "note" | "image";
    defaultValue?: string | number;
};
export type ScratchBlock = {
    opcode: string;
    blockType: "command" | "reporter" | "Boolean" | "hat" | "button" | "conditional" | "event" | "loop";
    text: string;
    arguments?: {
        [key: string]: ScratchBlockArgument;
    };
    filter?: ("sprite" | "stage")[];
    branchCount?: number;
    blockAllThreads?: boolean;
    terminal?: boolean;
    func?: string;
};
export type ScratchMenuItem = {
    value: string;
    text?: string;
} | string;
export type ScratchMenu = {
    acceptReporters?: boolean;
    items: ScratchMenuItem[] | string;
} | ScratchMenuItem[] | string;
export type ScratchExtensionInfo = {
    id: string;
    name?: string;
    menuIconURI?: string;
    blockIconURI?: string;
    blocks?: ScratchBlock[];
    color1?: string;
    color2?: string;
    color3?: string;
    docsURI?: string;
    menus?: {
        [key: string]: ScratchMenu;
    };
    translation_map?: {
        [key: string]: {
            [key: string]: string;
        };
    };
};
export interface ScratchExtension {
    runtime?: any;
    getInfo(): ScratchExtensionInfo;
}
declare global {
    interface Window {
        vm: {
            extensionManager: {
                runtime: any;
                _registerInternalExtension: (extension: ScratchExtension) => string;
                _loadedExtensions: Map<string, string>;
            };
        };
    }
}
export declare const loadUnsandboxedExtension: (extensionClass: any) => void;
