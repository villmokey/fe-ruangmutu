export function checkPermission(guarded = [], current = '') {
    return guarded.some((x) => x === current);
}