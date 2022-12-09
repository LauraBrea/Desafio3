import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;

const products = JSON.parse(await fs.promises.readFile('././Products.json', "utf-8"));

//app.get("/products", (req, res) => {
//  res.json(products);
//});

app.get("/products", (req, res) => {
  const limit = req.query.limit;
    if (limit == '') {
        return res.json(products);
    } else {
      let limitProd = products.slice (0,limit);
      res.json (limitProd);
    }
});

app.get("/products/:pid?", (req, res) => {
  console.log(req);
  const {pid} = req.params;
  console.log (pid);
  const searchProd = products.find ((product) => product.id == pid) ;
  res.json(searchProd);
});

app.listen(PORT, () => {
  console.log(`🔥 Listening on port ${PORT}`);
});
  