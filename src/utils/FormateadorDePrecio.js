export function FormetearPrecio(precio){
    return `$${precio.toLocaleString("en")}`;
}