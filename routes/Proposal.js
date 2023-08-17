const express = require('express')
const multer = require("multer");
const upload = require("../middleware/multer")
console.log('Multer middleware initialized');
const ProposalRouter = express.Router();
const { createProposal, getUserSelectedProposals, getAllProposals, getSingleProposal, updateProposal, deleteProposal, allProposals } = require('../controllers/Proposal')
ProposalRouter.post('/proposal', upload.array('images'), createProposal);
ProposalRouter.put('/:id', upload.array('images'), updateProposal);


ProposalRouter.get('/proposal/vendor/:id', getAllProposals);
ProposalRouter.route('/:id').post(deleteProposal);

ProposalRouter.get('/proposals', allProposals)
ProposalRouter.get('/proposal/:id', getSingleProposal)
ProposalRouter.get('/selected/:id', getUserSelectedProposals);
module.exports = ProposalRouter