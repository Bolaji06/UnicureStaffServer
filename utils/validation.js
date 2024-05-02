const paramValidation = {
  card_number: {
    in: ["params"], // optional (By default, all specified fields are validated in all request locations)
    notEmpty: {
      errorMessage: "Params cannot be empty",
    },
    trim: true,
    toLowerCase: true,
  },
};

const queryValidation = {
  card_number: {
    in: ["query"],
    notEmpty: {
      errorMessage: "Field cannot be empty",
    },
    trim: true,
    toLowerCase: true,
  },
};
const addPersonalInfoValidation = {
  first_name: {
    notEmpty: {
      errorMessage: "First name cannot be empty",
    },
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: "First name should be 2 to 20 length",
    },
  },
  last_name: {
    notEmpty: {
      errorMessage: "Last name cannot be empty",
    },
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: "Last name should be 2 to 20 length",
    },
  },
  home_address: {
    notEmpty: {
      errorMessage: "Home address cannot be empty",
    },
    isLength: {
      options: {
        min: 5,
        max: 50,
      },
      errorMessage: "Enter a valid home address",
    },
  },
  phone_number: {
    notEmpty: {
      errorMessage: "Phone number cannot be empty",
    },
    isLength: {
      options: {
        min: 11,
        max: 11,
      },
    },
    errorMessage: "Phone number should be 11 digits",
  },
  gender: {
    exists: {
      errorMessage: "Select your gender",
    },
  },
  next_of_kin: {
    notEmpty: {
      errorMessage: "Cannot be empty",
    },
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
    },
  },
  emergency_contact: {
    notEmpty: {
      errorMessage: "Cannot be empty",
    },
    isLength: {
      options: {
        min: 11,
        max: 11,
      },
      errorMessage: "Phone number should be 11 digits",
    },
  },
};

const addWorkInfoValidation = {
    
}

module.exports = {
  paramValidation,
  queryValidation,
  addPersonalInfoValidation,
};
