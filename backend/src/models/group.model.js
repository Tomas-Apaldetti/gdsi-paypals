const mongoose = require('mongoose');
const { toJSON } = require('./plugins');


const inviteSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['PERSONAL', 'LINK'],
    required: true
  },
  for: {
    type: mongoose.Types.ObjectId,
    required: function(){
      return this.type === 'PERSONAL'
    }
  },
  validUntil: {
    type: Date,
    required: function(){
      return this.type === 'LINK'
    }
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'DENIED', 'EXPIRED'],
    required: true,
    default: 'PENDING'
  },
  answeredOn: {
    type: Date,
    required: function(){
      return this.status === 'ACCEPTED' || this.status === 'DENIED'
    },
  }
})

inviteSchema.plugin(toJSON);

const groupSchema = mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 30, trim: true },
    description: { type: String, default: '', maxlength: 255, trim: true },
    category: { type: String, default: '', maxlength: 255, trim: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    members: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    invites: [inviteSchema]
  },
  {
    timestamps: true,
  },
);

groupSchema.plugin(toJSON);

module.exports = {
  Group: mongoose.model('Group', groupSchema),
  Invite: mongoose.model('Invite', inviteSchema)
};
