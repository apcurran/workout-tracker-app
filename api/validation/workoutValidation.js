"use strict";

const Joi = require("@hapi/joi");

function workoutValidation(data) {
    const schema = Joi.object({
        description: Joi
                    .string()
                    .min(1)
                    .required(),
        duration: Joi
                    .string()
                    .min(1)
                    .required(),
        workout_date: Joi
                    .string()
                    .min(1)
                    .required()
    });

    return schema.validateAsync(data);
}

function workoutEditValidation(data) {
    const schema = Joi.object().keys({
        description: Joi
                    .string()
                    .min(1)
                    .required(),
        duration: Joi
                    .string()
                    .min(1)
                    .required(),
        workout_date: Joi
                    .string()
                    .min(1)
                    .required()
    }).min(1);

    return schema.validateAsync(data);
}

module.exports = {
    workoutValidation,
    workoutEditValidation
};