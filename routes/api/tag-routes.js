const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
	// find all tags
	try {
		const tags = await Tag.findAll({ include: [{ model: Product }] });
		res.status(200).json(tags);
	} catch (err) {
		res.status(500).json(err);
	}
	// be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
	// find a single tag by its `id`
	try {
		const tag = await Tag.findOne({
			where: { id: req.params.id },
			include: [{ model: Product }],
		});
		res.status(200).json(tag);
	} catch (err) {
		res.status(500).json(err);
	}
	// be sure to include its associated Product data
});

router.post("/", async (req, res) => {
	// create a new tag
	try {
		const new_Tag = await Tag.create(req.body);
		res.status(200).json(new_Tag);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put("/:id", async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const updatingTags = await Tag.update(
			{
				tag_name: req.body.tag_name,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.status(200).json(updatingTags);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", async (req, res) => {
	// delete on tag by its `id` value
	try {
		const delete_Tag = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!delete_Tag) {
			res.status(404).json({ message: "No Tag exist at that id" });
			return;
		}
		res.status(200).json(delete_Tag);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
