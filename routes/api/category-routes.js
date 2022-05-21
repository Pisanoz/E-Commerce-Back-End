const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
	// find all categories
	try {
		const product = await Category.findAll({ include: [{ model: Product }] });
		res.status(200).json(product);
		if (!product) {
			res.status(404).json({ message: "No Category found" });
			return;
		}
	} catch (err) {
		res.status(500).json(err);
	}
	// be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
	// find one category by its `id` value
	try {
		const product = await Category.findOne({
			where: { id: req.params.id },
			include: [{ model: Product }],
		});
		res.status(200).json(product);

		if (!product) {
			res.status(404).json({ message: "No Category at that id" });
			return;
		}
	} catch (err) {
		res.status(500).json(err);
	}
	// be sure to include its associated Products
});

router.post("/", async (req, res) => {
	// create a new category
	try {
		const new_Category = await Category.create(req.body);
		res.status(200).json(new_Category);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put("/:id", async (req, res) => {
	// update a category by its `id` value
	try {
		const updating_Category = await Category.update(
			{
				category_name: req.body.category_name,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.status(200).json(updating_Category);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", async (req, res) => {
	// delete a category by its `id` value
	try {
		const delete_Category = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!delete_Category) {
			res.status(404).json({ message: "No Category by that id" });
			return;
		}
		res.status(200).json(delete_Category);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
