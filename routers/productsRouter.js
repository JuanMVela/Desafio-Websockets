const fs = require("fs");
const express = require("express");
const productsRouter = express.Router();

let prodDataBase = JSON.parse(
  fs.readFileSync("./database/productos.JSON", "utf-8")
);

productsRouter.get("/", (req, res) => {
  const { limit } = req.query;

  if (limit) return res.json(prodDataBase.slice(0, limit));
  else return res.json(prodDataBase);

  // Mostrar los productos
});
productsRouter.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const idProd = prodDataBase.find((pro) => pro.id === +pid);
  res.send(idProd);
  // Mostrar los productos con la ID indicada
});

productsRouter.post("/", (req, res) => {
  let productoBody = req.body;
  let id =
    prodDataBase.length > 0 ? prodDataBase[prodDataBase.length - 1].id + 1 : 1;

  let productoNuevo = { id, ...productoBody };
  if (productoNuevo) {
    prodDataBase.push(productoNuevo);
    fs.writeFileSync("./database/productos.JSON", JSON.stringify(prodDataBase));

    return res.status(200).json({
      message: "Producto Agregado",
      productoNuevo,
    });
  } else {
    res.status(400).json({
      message: "Error",
    });
  }
  // agregar el producto al carrito
});
productsRouter.put("/:pid", (req, res) => {
  const { pid } = req.params;
  console.log(pid);
  const bodyProduct = req.body;
  console.log(bodyProduct);
  let idExist = prodDataBase.find((pro) => pro.id === +pid);
  console.log(idExist);
  if (idExist) {
    idExist = { id: +pid, ...bodyProduct };
    let indexAct = prodDataBase.findIndex((pro) => pro.id === +pid);
    prodDataBase[indexAct] = idExist;
    fs.writeFileSync("./database/productos.JSON", JSON.stringify(prodDataBase));

    console.log(indexAct);
    res.send("Producto Actualizado");
  } else {
    res.status(400);
    res.send("No existe un producto con esa ID");
  }
  // Actualizar Productos
});
productsRouter.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  if (pid) {
    prodDataBase = prodDataBase.filter((producto) => producto.id !== +pid);
    fs.writeFileSync("./database/productos.JSON", JSON.stringify(prodDataBase));

    res.send("El Producto ha sido eliminado");
  } else {
    res.status(404).send("El producto no existe");
  }
  // Mostrar los productos con la ID indicada
});

module.exports = productsRouter;
