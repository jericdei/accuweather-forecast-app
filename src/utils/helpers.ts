export function leftFillNum(num: number, targetLength: number) {
    return num.toString().padStart(targetLength, "0")
}
