export const loadUnsandboxedExtension = (extensionClass) => {
    const instance = new extensionClass(window.vm.extensionManager.runtime);
    const service = window.vm.extensionManager._registerInternalExtension(instance);
    window.vm.extensionManager._loadedExtensions.set(instance.getInfo().id, service);
};
