export function parseCamelCase(str) {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str){ return str.toUpperCase(); })
}

export function capitalize(str) {
    const lower = str.toLowerCase();
    const capital = lower.charAt(0).toUpperCase() + lower.slice(1);

    return capital;
}
