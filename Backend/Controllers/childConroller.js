const Child = require("../Models/childModel")

// Add child
exports.addChild = async (req, res) => {
  try {
    const { name, dateOfBirth, gender, parentId } = req.body;

    if (!name || !dateOfBirth || !gender || !parentId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newChild = new Child({ name, dateOfBirth, gender, parentId });
    await newChild.save();

    res.status(201).json({ message: "Child added successfully", child: newChild });
  } catch (error) {
    console.error("Add Child Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get children by parent ID
exports.getChildrenByParent = async (req, res) => {
  try {
    const { id } = req.params;
    const children = await Child.find({ parentId: id }).sort({ createdAt: -1 });
    res.status(200).json(children);
  } catch (error) {
    console.error("Get Children Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateChild = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedChild = await Child.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedChild) return res.status(404).json({ message: "Child not found" });

    res.status(200).json({ message: "Child updated", child: updatedChild });
  } catch (error) {
    console.error("Update Child Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
