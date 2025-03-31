import Order from "../models/order.model.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).exec();
    res.json({ orders });
  } catch (error) {
    console.log("Error in getAllOrders controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const orders = await Order.find({ user: id })
      .sort({ createdAt: -1 })
      .exec();
    if (orders.length === 0) {
      const emptyOrder = [];
      return res.json({ emptyOrder });
    }
    res.json({ orders });
  } catch (error) {
    console.error("Error in getUserOrder controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(id);

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log("Error in deleteOrder controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const toggleOrderstatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.log("Error in toggleOrderStatus controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
