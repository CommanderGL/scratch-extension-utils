import 'arrive';
import VM from 'scratch-vm';

export type ScratchBlockArgument = {
    type: "string" | "number" | "angle" | "Boolean" | "color" | "matrix" | "note" | "image",
    defaultValue?: string | number,
    menu?: string
}

export type ScratchBlock = {
    opcode: string
    blockType: "command" | "reporter" | "Boolean" | "hat" | "button" | "conditional" | "event" | "loop",
    text: string,
    arguments?: {[key: string]: ScratchBlockArgument},
    filter?: ("sprite" | "stage")[],
    branchCount?: number,
    blockAllThreads?: boolean,
    terminal?: boolean,
    func?: string,
    disableMonitor?: boolean,
    hideFromPalette?: boolean,
    reporterScope?: string,
    isEdgeActivated?: boolean,
    shouldRestartExistingThreads?: boolean
}

export type ScratchMenuItem = {
    value: string,
    text?: string
} | string;

export type ScratchMenu = {
    acceptReporters?: boolean,
    items: ScratchMenuItem[] | string
} | ScratchMenuItem[] | string;

export type ScratchExtensionInfo = {
    id: string
    name?: string,
    menuIconURI?: string,
    blockIconURI?: string,
    blocks?: ScratchBlock[],
    color1?: string
    color2?: string,
    docsURI?: string,
    menus?: {[key: string]: ScratchMenu},
    translation_map?: {[key: string]: {[key: string]: string}}
}

interface ScratchExtensionImpl {
    runtime?: VM.Runtime;
    getInfo(): ScratchExtensionInfo;
    removeFromSidebar(): void;
}

export class ScratchExtension implements ScratchExtensionImpl {
    getInfo(): ScratchExtensionInfo {
        return {
            id: "MustSpecifyGetInfo"
        }
    }

    removeFromSidebar(): void {
        document.arrive(`.scratchCategoryId-${this.getInfo().id}`, elem => {
            elem.parentElement?.remove();
        });
    }
}

export type Runtime = VM.Runtime;

interface ModdedExtensionManager extends VM.ExtensionManager {
    _registerInternalExtension(instance: ScratchExtension): string;
    _loadedExtensions: Map<string, string>;
}

interface ModdedVM extends VM {
    extensionManager: ModdedExtensionManager;
}

declare global {
    interface Window {
        vm: ModdedVM
    }
}

export const loadUnsandboxedExtension = (extensionClass: any) => {
    const instance = <ScratchExtension>(new extensionClass(window.vm.extensionManager.runtime));
    const service = window.vm.extensionManager._registerInternalExtension(instance);
    window.vm.extensionManager._loadedExtensions.set(instance.getInfo().id, service);
}