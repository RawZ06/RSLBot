export const Logger = {
    info: (...args) => {
        console.log(`[${new Date().toLocaleString()}]`, ...args)
    }
}