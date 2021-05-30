const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedWorkshopConductor  } = require("../middlewares/route-authorization");

//import controllers
const {
    getWorkshopConductor,
    updateWorkshopConductor,
    deleteWorkshopConductor,
    addWorkshopProposal,
    updateWorkshopProposal,
    removeWorkshopProposal,
    updateProfilePicture
} = require("../controllers/workshopconductor-controller");


//workshop conductor profile routes
router.route("/workshopconductor").get(protectedWorkshopConductor ,getWorkshopConductor);
router.route("/workshopconductor/update").put(protectedWorkshopConductor ,updateWorkshopConductor);
router.route("/workshopconductor/updatepp").put(protectedWorkshopConductor ,updateProfilePicture);
router.route("/workshopconductor/delete").delete(protectedWorkshopConductor ,deleteWorkshopConductor);



//workshop proposal routes
router.route("/workshopconductor/proposal/add").put(protectedWorkshopConductor ,addWorkshopProposal);
router.route("/workshopconductor/proposal/update").put(protectedWorkshopConductor,updateWorkshopProposal);
router.route("/workshopconductor/proposal/delete").put(protectedWorkshopConductor,removeWorkshopProposal);


module.exports = router;

