let _flags = {devTestFlag: true};
export const useFlags = () => _flags

// @ts-ignore
export function decorator(story, {parameters}) {
    if (parameters && parameters.flags) {
        _flags = parameters.flags;
    }
    return story();
}
