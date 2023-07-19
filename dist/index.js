import 'arrive';
export class ScratchExtension {
    getInfo() {
        return {
            id: "MustSpecifyGetInfo"
        };
    }
    removeFromSidebar() {
        document.arrive(`.scratchCategoryId-${this.getInfo().id}`, elem => {
            elem.parentElement?.remove();
        });
    }
}
export const loadUnsandboxedExtension = (extensionClass) => {
    const instance = (new extensionClass(window.vm.extensionManager.runtime));
    const service = window.vm.extensionManager._registerInternalExtension(instance);
    window.vm.extensionManager._loadedExtensions.set(instance.getInfo().id, service);
};
