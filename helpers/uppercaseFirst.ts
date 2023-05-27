/**
 * @param {any} input the string to uppercase
 * Makes/Tries to  uppercase the first letter of a given input
 * @return {string}
 */
export default function uppercaseFirst(input: any): string {
    if (input) { 
        let dataInput = input.toString()
        return dataInput.charAt(0).toUpperCase()+dataInput.slice(1)
    }
    return " "
}