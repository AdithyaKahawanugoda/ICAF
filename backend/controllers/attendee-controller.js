const AttendeeModel = require("../models/attendee-model");
const AllUsersModel = require("../models/allusers-model");
const { cloudinary } = require("../utils/cloudinary");
const mongoose = require("mongoose");

//Fetching attendee profile details
exports.getAttendeeDetails = async(req,res) => {
    try {
        if (!req.user) {
            res.status(422).json({
                success: false,
                desc: "Can not find the user - Please check again",
            });
        } else {
            res.status(200).send({
                attendee: req.user,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in get Attendee Profile Data controller-" + error,
        });
    }
}

//Updating attendee profile details
exports.updateAttendeeDetails = async(req,res) => {
    const { username,email,profileImgEnc} = req.body;

    await cloudinary.uploader.destroy(
        req.user.profileImage.imagePublicId
    );
    //preset needs to add here
    const uploadedResponse = await cloudinary.uploader.upload(profileImgEnc, {
        upload_preset: "Attendee-profile-pictures",
    });
    try{
        const newData = {
            username,
            email,
            profileImage: {
                imagePublicId: uploadedResponse.public_id,
                imageSecURL: uploadedResponse.secure_url,
            }
        };

        const updatedAttendee = await AttendeeModel.findByIdAndUpdate(
            req.user.id,
            newData
        );

        res.status(200).send({
            success: true,
            desc: "user updated successfully",
            updatedAttendee,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            desc: "Error in update Attendee Profile Data controller-" + error,
        });
    };

}

//Deleting attendee profile details
exports.deleteAttendeeDetails = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.user._id))
        return res.status(404).send(`No attendee with id: ${req.user._id}`);

    try {
        await AttendeeModel.findByIdAndRemove(req.user._id);
        await AllUsersModel.findOneAndRemove({ email: req.user.email });
        const cloudinaryRes = await cloudinary.uploader.destroy(
            req.user.profileImage.imagePublicId
        );
        res.status(200).send({
            success: true,
            desc: "Attendee deleted successfully",
            cloudinaryRes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Attendee Profile controller-" + error,
        });
    }
};

