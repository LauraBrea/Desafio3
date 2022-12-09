import fs from "fs";

class ProductManager {

    constructor () {
        this.products = [];
        this.path = '././Products.json'
        this.productsTempo = [];
    }

    async addProduct (title, description, price, thumbnail, code, stock ) {
        try {

            const product = {
                id: this.#getMaxId() + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            if (fs.existsSync(this.path)) {
                this.#readProducts();

                        if (title == "" || description == "" || price == "" || thumbnail == "" || code == "" || stock== "" ) {
                                console.log ("Incomplete data");
                        } else {
                            if(!this.products.some(p => p.code === product.code)) {
                                this.products.push(product);
                                console.log (this.products); 
                                return product.id;
                            } else {
                                console.log (`This product code ${product.code} already exists.`); 
                            }
                        }
            } else {
                        if (title == "" || description == "" || price == "" || thumbnail == "" || code == "" || stock== "" ) {
                                console.log ("Incomplete data");
                        } else {
                            if(!this.products.some(p => p.code === product.code)) {
                                this.products.push(product);
                                console.log (this.products); 
                                return product.id;
                            } else {
                                console.log (`This product code ${product.code} already exists.`); 
                            }
                        }
            }
            fs.promises.writeFile(this.path, JSON.stringify(this.products));
        } catch (error) {
            console.log(error);
            throw new Error(error);
            }
        };
            

    async getProducts () {
        try {
            if (fs.existsSync(this.path)) {
                await this.#readProducts();
                    if (this.products.length < 1) {
                        console.log("Empty list");
                        return;
                    } else {
                        console.log(this.products);
                    }
            } else {
                throw new Error("Empty list");
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };
    
    async getProductById (idProduct) {
        try {
            if (fs.existsSync(this.path)) {
                await this.#readProducts();
                    const product = this.#getId(idProduct);
                    if (product) {
                        console.log(product);
                    } else {
                        console.log(`Product ID ${idProduct} not found.(search)`);
                    }
            } else {
                throw new Error("Empty list");
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    async updateProduct (idProduct, title, description, price, thumbnail, code, stock ) {
        try {
            if (fs.existsSync(this.path)) {
                        
                const dataTempo = {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    };

                await this.#readProducts();
                const product = this.#getId(idProduct);
                    if (product) {

                            const dataUpdate = { 
                                id: idProduct, ...dataTempo }
                            this.productsTempo.push(dataUpdate);
                            console.log(dataUpdate);

                            await this.#readProducts();
                            const searchProd= this.products.filter((product) => product.id !== idProduct);    
                            this.products = searchProd;
                            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                            
                            await this.#readProducts();
                            this.products.push(dataUpdate);
                            await fs.promises.writeFile(this.path, JSON.stringify(this.products))

                    } else {
                        console.log(`Product ID ${idProduct} not found.(update)`);
                    }
                } else {
                    throw new Error("Empty list");
                }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    async deleteProduct(idProduct) {
        try {
            if (fs.existsSync(this.path)) {
                await this.#readProducts();

                    const product = this.#getId(idProduct);
                        if (product) {

                            let deleteProd= this.products.filter((product) => product.id !== idProduct);    
                            console.log(deleteProd);
                            this.products= deleteProd;
                            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                        } else {
                            console.log(`Product ID ${idProduct} not found.(delete)`);
                        }
            } else {
                throw new Error("Empty list");
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    async #readProducts() {
        const products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        this.products = products;
    };

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    };

    #getId(idProduct) {
        this.#readProducts();
        return this.products.find((product) => product.id === idProduct);
    };
}


const productManager = new ProductManager();

/* Retorna leyenda lista vacía */
productManager.getProducts ();

/* Retorna arrays con productos ingresados */
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123", 25);
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc124", 25);
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc125", 25);
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc126", 25);
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc127", 25);
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc128", 25);
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc129", 25);
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc130", 25);

/* Retorna lista de productos cargados */
productManager.getProducts ();

/* No se agrega por código repetido */
productManager.addProduct ("producto prueba","Este es un producto prueba",200,"Sin imagen","abc125", 25);

/* No se agrega por falta de datos */
productManager.addProduct ("","Este es un producto prueba",200,"Sin imagen","abc126", 25);

/* Retorna producto seleccionado por ID */
productManager.getProductById (3);

/* Id no encontrado */
productManager.getProductById (88);

/* Update producto */
productManager.updateProduct (7,"NUEVO producto prueba","Este es un producto prueba",200,"Sin imagen","abc125", 50); 

/* Retorna error Update - producto no existe */
productManager.updateProduct (55,"NUEVO producto prueba","Este es un producto prueba",200,"Sin imagen","abc125", 50); 

/* Delete producto */
productManager.deleteProduct (8);

/* Retorna error Delete - producto no existe */
productManager.deleteProduct (66);






