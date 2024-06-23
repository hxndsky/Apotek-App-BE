import Category from "../models/categoryModel.js";

// Get All Categories
export const getCategory = async (req, res) => {
  try {
    let category = await Category.find();
    res.status(200).json({ category });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get Products by Category ID
export const getProductByCategory = async (req, res) => {
  const { id } = req.params;
  const field = {
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
    list_product: { createdAt: 0, updatedAt: 0, __v: 0 },
  };
  try {
    let category = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "id_category",
          foreignField: "id_category",
          as: "list_product",
        },
      },
      {
        $match: {
          id_category: id,
        },
      },
    ]).project(field);
    res.status(200).json({ category });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Add Category
export const postCategory = async (req, res) => {
  const { id_category, name_category, icon } = req.body;

  try {
    const existingCategory = await Category.findOne({
      $or: [{ id_category }, { name_category }],
    });

    if (existingCategory) {
      return res.status(400).json({ msg: 'Category with this ID or name already exists' });
    }

    const newCategory = new Category({
      id_category,
      name_category,
      icon,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({ savedCategory });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { id_category, name_category, icon } = req.body;

  try {
    let category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    category.id_category = id_category || category.id_category;
    category.name_category = name_category || category.name_category;
    category.icon = icon || category.icon;

    const updatedCategory = await category.save();
    res.status(200).json({ updatedCategory });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(200).json({ msg: 'Category deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
