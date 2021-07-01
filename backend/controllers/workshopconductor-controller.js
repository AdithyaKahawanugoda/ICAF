const WorkshopConModel = require("../models/workshopconductor-model");
const AllUsersModel = require("../models/allusers-model");
const NotificationModel = require("../models/notification-model");
const { cloudinary } = require("../utils/cloudinary");
const mongoose = require("mongoose");

//Fetching workshop conductors profile
exports.getWorkshopConductor = async(req,res) =>{
    try {
        if (!req.user) {
            res.status(422).json({
                success: false,
                desc: "Can not find the user - Please check again",
            });
        } else {
            res.status(200).send({
                workshopConductor: req.user,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in get Workshop Conductor Profile Data controller-" + error,
        });
    }
}

//Updating workshop conductor's profile Deatails
exports.updateWorkshopConductor = async(req,res) => {
    const { username,email} = req.body;

    if (email) {
        try {
          await AllUsersModel.findOneAndUpdate(
            { email: req.user.email },
            { email: email },
            { omitUndefined: true }
          );
        } catch (error) {
          res.status(500).json({
            success: false,
            desc:
              "Error in updateWorkshopConductorDetails-updateAllUsers controller-" + error,
          });
        }
      }
    try{
  
        const updateWorkshopConductor = await WorkshopConModel.findByIdAndUpdate(
            req.user.id,
            {
                username,
                email,
              },
            {
                new: true,
                upsert: false,
                omitUndefined:true
            }
        );

        res.status(200).send({
            success: true,
            desc: "user updated successfully",
            updateWorkshopConductor,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            desc: "Error in update Workshop Conductor Profile Data controller-" + error,
        });
    };

}
//Update workshop profile photo
exports.updateProfilePicture = async (req, res) => {
    const { fileEnc } = req.body;
  
    try {
      const destroyedImage = await cloudinary.uploader.destroy(
        req.user.profileImage.imagePublicId
      );
      if (destroyedImage) {
        try {
          const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
            upload_preset: "WorkshopConductor-profile-pictures",
          });
  
          try {
            const updatedWorkshop = await WorkshopConModel.findByIdAndUpdate(
              { _id: req.user._id },
              {
                profileImage: {
                  imagePublicId: uploadedResponse.public_id,
                  imageSecURL: uploadedResponse.secure_url,
                },
              },
              {
                new: true,
                upsert: false,
              }
            );
            res.status(200).send({
              success: true,
              desc: " updated successfully",
              updatedWorkshop,
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              desc: "Error in updating workshop profileImage data-" + error,
            });
          }
        } catch (error) {
          res.status(500).json({
            success: false,
            desc: "Error in uploading new image-" + error,
          });
        }
      } else {
        res.status(500).json({
          success: false,
          desc: "Error in previous image remove-" + error,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in updateProfilePicture controller-" + error,
      });
    }
  };
  
//Deleting workshop conductor's profile
exports.deleteWorkshopConductor = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.user._id))
        return res.status(404).send(`No workshop conductor with id: ${req.user._id}`);

    try {
        await WorkshopConModel.findByIdAndRemove(req.user._id);
        await AllUsersModel.findOneAndRemove({ email: req.user.email });
        const cloudinaryRes = await cloudinary.uploader.destroy(
            req.user.profileImage.imagePublicId
        );
        res.status(200).send({
            success: true,
            desc: "Workshop Conductor deleted successfully",
            cloudinaryRes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Attendee Profile controller-" + error,
        });
    }
};

// //Adding workshop proposal
exports.addWorkshopProposal = async(req,res) =>{

    const { workshopTopic,workshopDescription,fileEnc} = req.body;
    const workshopConductor = req.user._id;
    const data = {
      fromId: req.user._id,
      subject: "New workshop proposal added",
      desc: "-New workshop proposal has added which needs to be reviwed by the reviewer",
    };

    //file upload
    const workshopUploadedResponse = await cloudinary.uploader.upload(fileEnc, {
        resource_type: "raw",
        upload_preset: "Workshop-Proposals",
        format: "pptx",
    }
      //   function (err, result) {
      //       if (err) {
      //           console.log(err);
      //           return callback(err);
      //       }
      // }
    );

    try{
        const workshopData ={
            // workshopConductor:req.user._id,
            workshopTopic,
            workshopDescription,
            proposalPublicId:workshopUploadedResponse.public_id,
            proposalSecURL:workshopUploadedResponse.secure_url,
        };


        await WorkshopConModel.findOneAndUpdate(
            {_id:workshopConductor},
            {$push:{workshopData:workshopData}},
            {
                new: true,
                upsert: false,
            }
        );
        const result = await sendNotification(data, res);
        if (result) {
          res.status(201).json({ status: "Workshop Proposal added to the workshopData",success: true, result });
        }    
        //res.status(200).send({status: "Workshop Proposal added to the workshopData"});

    }catch(error){
        res.status(500).send({ error: error.message });
    }
}

//updating workshop proposal
exports.updateWorkshopProposal = async (req, res) => {
    const { workshopTopic,workshopDescription,workshopPropId} = req.body;
    try {
      const result = await WorkshopConModel.findOneAndUpdate(
        { "workshopData._id": workshopPropId },
        {
          $set: {
            "workshopData.$.workshopTopic": workshopTopic,
            "workshopData.$.workshopDescription": workshopDescription,
            
          },
        },
        {
          new: true,
          upsert: false,
          omitUndefined: true,
        }
      );
      res
        .status(200)
        .json({ success: true, desc: " workshop proposal updated", result });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in updatereaserch data controler-" + error,
      });
    }
  };

//Removing workshop proposal
exports.removeWorkshopProposal = async(req,res) =>{
    const {workshopPropId} = req.body;
    try{
        //const workshopConductorId = req.user._id;
        const updatedWorkshopData = await WorkshopConModel.updateOne(
            { _id: req.user._id },
            { $pull: { workshopData: { _id: workshopPropId } } },
            {
              new: true,
            }
          );
        res.status(200).json({
            success: true,
            desc: "workshop proposal deleted",
            updatedWorkshopData,
          });
    }catch(error){
        res.status(500).json({
            success: false,
            desc: "Error in removeWorkshopData controler-" + error,
          });
    }
};

const sendNotification = async (data, res) => {
  try {
    const newNotification = await NotificationModel.create({
      from: {
        userRole: "workshop conductor",
        userid: data.fromId,
      },
      to: {
        userRole: "reviewer",
      },
      subject: data.subject,
      description: data.desc,
    });
    return newNotification;
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in sendNotification in editor controller - " + error,
    });
  }
};

//fetch notification
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({
      "to.userid": req.user._id,
    });
    res.status(500).json({
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getNotifications in notification controller - " + error,
    });
  }
};

//fetch all workshop proposals
exports.getAllWorkshopProposals = async (req, res) => {
  // let workshopData = [];
  let workshopProposal;

  try {
    const workshopProposals = await WorkshopConModel.find();
    for (let i = 0; i < workshopProposals.length; i++) {
      // workshopData.push(workshopProposals[i].workshopData);
      workshopProposal = workshopProposals[i].workshopData;
      // console.log(workshopProposal);
      // workshopData.push(proposal);
    }

    res.status(200).send({ workshopProposal });
  } catch (err) {
    res.status(500).json({
      success: false,
      desc: "Error in getWorkshopProposals in workshopconductor controller -" + err,
    });
  }
};

// //fetch one specific workshop proposal
// exports.getWorkshopProposal = async(req,res) =>{
//   let proposal;
//   const {workshopPropId} = req.body;
//   try{
//      const workProposal = await WorkshopConModel.find();
//      for (let i = 0; i < workshopProposals.length; i++) {
//         proposal = workshopProposals[i].workshopData._id;
     
//     }

//      res.status(200).send({ workProposal });
//   }catch(err){
//     res.status(500).json({
//       success: false,
//       desc: "Error in getWorkshopProposal in workshopconductor controller -" + err,
//     });
//   }
// };