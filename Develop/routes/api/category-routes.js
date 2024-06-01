const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
// include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// find one category by its `id` value
// include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(400).json({ message: "not found" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(error);
    res.status(500).json(error);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  if (!categoryData [0]) {
    res.status(400).json({message: "Category is not found."});
    return;
  }
  res.status(200).json(categoryData);
} catch (error) {
  console.log (error);
  res.status(500).json(error);
}
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
      });
      if (!categoryData) {
        res.status (400).json({ message: "Catgeory not found."});
        return;
      }
      res.status(200).json(categoryData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  // delete a category by its `id` value
});

module.exports = router;
