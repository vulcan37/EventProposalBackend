const Proposal = require('../models/Proposal');
const User = require('../models/user_model')
const cloudinary = require('../middleware/cloudinary');


const createProposal = async (req, res) => {
  try {
    let arr = [];
    arr = await req.files.map(file => file.path);
    for (let i = 0; i < arr.length; i++) {
      let imgUrl = await cloudinary.uploader.upload(arr[i]);
      console.log(imgUrl);
      arr[i] = imgUrl.secure_url;
    }
    let proposal = new Proposal({
      ...req.body,
      images: arr
    });
    await proposal.save();
    res.status(200).json({
      status: "Success",
      data: proposal
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const getAllProposals = async (req, res) => {
  try {
    let proposals = await Proposal.find({ vendorId: req.params.id });
    res.status(200).json({
      status: "Success",
      data: proposals
    })
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    })
  }
}
const updateProposal = async (req, res) => {
  try {
    let proposals = await Proposal.findById(req.params.id);
    if (!proposals) return res.status(404).json({ status: "Failed", message: "Invalid Id" });
    if (req.files && req.files.length > 0) {
      const arr = req.files.map(file => file.path);
      for (let i = 0; i < arr.length; i++) {
        let imgUrl = await cloudinary.uploader.upload(arr[i]);
        console.log(imgUrl)
        arr[i] = imgUrl.secure_url;
      }
      proposals = await Proposal.findByIdAndUpdate(req.params.id, { ...req.body, images: [...arr] }, { new: true });
    } else {
      proposals = await Proposal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    }
    res.status(200).json({ status: "Success", proposals });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error.message });
  }
}
const deleteProposal = async (req, res) => {
  try {
    const id = req.params.id;
    let post = await Proposal.findById(id);
    if (!post) return res.status(400).json({
      status: "Failed",
      message: "Id is invalid"
    })
    else {
      await Proposal.findByIdAndDelete(id)
    }
    res.status(200).json({
      status: "Success"
    })
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: error.message
    })
  }

}
const allProposals = async (req, res) => {
  try {
    let proposals = await Proposal.find().populate("vendorId");
    res.status(200).json({ status: "Success", data: proposals });
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error.message });
  }

}
const getSingleProposal = async (req, res) => {
  try {
    let id = req.params.id;
    let proposal = await Proposal.findById(id).populate("vendorId");
    res.status(200).json({
      status: "Success",
      data: proposal
    })
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    })
  }
}
const getUserSelectedProposals = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    let proposals = [];
    for (let i = 0; i < user.selected_items.length; i++) {
      let proposal = await Proposal.findById(user.selected_items[i]).populate("vendorId");
      if (proposal) proposals.push(proposal);
    }
    res.status(200).json({
      status: "Success",
      data: proposals
    })
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    })
  }
}

module.exports = { createProposal, getUserSelectedProposals, getAllProposals, updateProposal, deleteProposal, allProposals, getSingleProposal }