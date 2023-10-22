const allProducts = async function allProducts() {
    const response = await fetch('https://burger-43f0c-default-rtdb.europe-west1.firebasedatabase.app/products.json');
    return await response.json();
}
console.log(allProducts)
export default allProducts;