/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /staffs              ->  create
 * GET     /staffs/me           ->  me
 * PUT	   /staffs/me 			->	update
 * GET     /staffs/:id          ->  show
 */

'use strict';

var Staff = require('./staff.model');
var User = require('../user/user.model');
var Business = require('../business/business.model');
var mongoose = require('mongoose');


/*
* POST    /staffs
* Create a new Staff
* restriction: 'staff'
*/
exports.create = function (req, res, next) {
	var userId = req.user._id;

	User.findById(userId, function(err, userFound){
		if(err) return res.send(500, err);
		if(!userFound) return res.status(404).json({ message : 'Cet utilisateur n\'existe pas.' });

		// If no staff profile already created
		if(userFound.staffId === undefined){
			
			var newStaff = new Staff({
				name: req.body.name,
				staffContact: {
					phone: req.body.phone,
					mobile: req.body.mobile,
					email: req.body.email
				},
				photoStaffURL: req.body.photoStaffURL,
				businessId: req.body.businessId,
				isActive: false
			});

			// Check business is existant
			Business.findById(req.body.businessId, function (err, businessFound){
				if(err) return res.send(500, err);
				if (!businessFound) { 
					return res.status(404).json({
						message: 'Le salon de coiffure demandé est introuvable.'
					}).end(); 
				} else {
					businessFound.staffs.push({
						staffName : newStaff.name,
						staffId : newStaff._id,
						staffVisibility : newStaff.isActive
					});

					businessFound.save(function (err, businessUpdated){
						if(err) return res.send(500, err);
					});
				}
			});

			// Create the staff
			newStaff.save(function (err, staffSaved){
				if(err) return res.send(500, err);
				
				// Update User
				userFound.staffId = staffSaved._id;
				userFound.businessId = req.body.businessId;

				userFound.save(function (err, userUpdated){
					if(err) return res.send(500, err);

					return res.status(201).json({
						message : 'Votre profil staff a été crée avec succès.'
					}).end();
				});
			});

		} else {
			return res.status(403).json({
				message : 'Vous avez déjà crée un profil staff.'
			}).end();
		}
	});
};

/*
* GET     /staffs/me
* Get my staff profile
* restriction: 'staff'
*/
exports.me = function(req, res, next){
	var staffId = req.user.staffId;

	Staff.findById(staffId, function (err, staffFound){
		if(err) return res.send(500, err);
		if(!staffFound) return res.status(404).json({ message : 'Vous n\'avez pas de profil staff existant.' });
		return res.status(200).json({
			staff : staffFound.profilePrivate
		}).end();
	});
};

/*
* PUT     /staffs/me
* Update my staff profile
* restriction : 'staff'
*/
exports.update = function (req, res, next){
	var staffId = req.user.staffId;

	Staff.findOne(staffId, function (err, staffFound){
		if(err) return res.send(500, err);
		if(!staffFound) return res.status(404).json({
			message : 'ce profil staff n\'existe pas.'
		});

		staffFound.name = String(req.body.name);
		staffFound.photoStaffURL = String(req.body.photoStaffURL);
		staffFound.staffContact.email = String(req.body.email);
		staffFound.staffContact.phone = String(req.body.phone);
		staffFound.staffContact.mobile = String(req.body.mobile);
		staffFound.businessId = staffFound.businessId;
		staffFound.isActive = staffFound.isActive;

		staffFound.save(function (err, staffUpdated){
			if(err) return res.send(500, err);
			return res.status(200).json({
				message : 'Votre profil staff a été correctement modifié.',
				staff: staffUpdated
			});
		});
	});
};

/*
* GET     /staffs/:id
* Get a single staff profile
*/
exports.show = function(req, res, next){
	var staffId = req.params.id;

	Staff.findById(staffId, function (err, staffFound){
		if(err) return res.send(500, err);
		if(!staffFound) return res.status(404).json({ message : 'Ce staff n\'existe pas.' });
		return res.status(200).json({
			staff : staffFound.profilePublic
		}).end();
	})
};