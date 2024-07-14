import Product from "../models/productModel.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    const productsWithImageUrl = products.map(product => ({
      ...product._doc,
      image: product.image ? `${req.protocol}://${req.get('host')}${product.image}` : null
    }));
    res.status(201).json({ products: productsWithImageUrl });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

// Post a new product
export const postProducts = async (req, res) => {
  const { productName, id_category, desc, indication, composition, dose, howtouse, effect, group, nie, price } = req.body;

  try {
    const newProduct = new Product({
      productName,
      id_category,
      image: req.file ? `/${req.file.path}` : null, // Menyimpan path ke gambar yang di-upload
      desc,
      indication,
      composition,
      dose,
      howtouse,
      effect,
      group,
      nie,
      price,
    });
    const saveProduct = await newProduct.save();
    res.status(201).json({ saveProduct });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


// Get a product by ID
export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    // Append image URL if image path exists
    const productWithImageUrl = {
      ...product._doc,
      image: product.image ? `${req.protocol}://${req.get('host')}${product.image}` : null
    };

    res.status(200).json({ product: productWithImageUrl });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};


// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, id_category, desc, indication, composition, dose, howtouse, effect, group, nie, price } = req.body;
  const image = req.file ? `/${req.file.path}` : null; // Menyimpan path ke gambar yang di-upload

  try {
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).send("Product Not Found");
    }

    product.productName = productName || product.productName;
    product.id_category = id_category || product.id_category;
    product.image = image || product.image;
    product.desc = desc || product.desc;
    product.indication = indication || product.indication;
    product.composition = composition || product.composition;
    product.dose = dose || product.dose;
    product.howtouse = howtouse || product.howtouse;
    product.effect = effect || product.effect;
    product.group = group || product.group;
    product.nie = nie || product.nie;
    product.price = price || product.price;

    const updatedProduct = await product.save();
    res.status(200).json({ updatedProduct });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};


// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send("Product Not Found");
    }

    await product.deleteOne();
    res.status(200).send("Product Successfully Deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { id_category } = req.params;
    const products = await Product.find({ id_category });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No Products Found for this Category" });
    }

    // Append image URL for each product if image path exists
    const productsWithImageUrl = products.map(product => ({
      ...product._doc,
      image: product.image ? `${req.protocol}://${req.get('host')}${product.image}` : null
    }));

    res.status(200).json({ products: productsWithImageUrl });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

