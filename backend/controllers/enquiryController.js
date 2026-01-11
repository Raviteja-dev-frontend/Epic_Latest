import EnquiryModel from "../models/enquiryModel.js";

export const submitEnquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newEnquiry = new EnquiryModel({ name, email, message });
    await newEnquiry.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending enquiry", error });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await EnquiryModel.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enquiries", error });
  }
};
