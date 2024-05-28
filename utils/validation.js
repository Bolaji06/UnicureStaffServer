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
  email: {
    notEmpty: {
      errorMessage: "Cannot be empty",
    },
    isLength: {
      options: {
        min: 5,
        max: 40,
      },
      errorMessage: "Provide a valid email",
    },
    isEmail: true,
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
  department: {
    notEmpty: {
      errorMessage: "Department cannot be empty",
    },
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
      errorMessage: "Provide the full name of department",
    },
  },
  job_title: {
    notEmpty: {
      errorMessage: "Job title cannot be empty",
    },
    isLength: {
      options: {
        min: 2,
        max: 40,
      },
      errorMessage: "Provide the full job title",
    },
  },
  account_number: {
    notEmpty: {
      errorMessage: "Account number cannot be empty",
    },
    isLength: {
      options: {
        min: 11,
        max: 11,
      },
      errorMessage: "Provide a valid account number",
    },
  },

  card_number: {
    notEmpty: {
      errorMessage: "Cannot be empty",
    },
    isLength: {
      options: {
        min: 2,
        max: 10,
      },
      errorMessage: "Provide a valid card number",
    },
  },
  position_status: {
    isLength: {
      option: {
        min: 2,
        max: 40,
      },
      errorMessage: "Provide a valid position status",
    },
  },
};

/* this is the schema for admin registration schema */
const adminRegistrationSchema = {
  username: {
    notEmpty: {
      errorMessage: "You need to provide a username",
    },
    isLength: {
      option: {
        min: 2,
        max: 20,
      },
      errorMessage: "Username should be between 2 - 20",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "You need to provide email field",
    },
    isEmail: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isLength: {
      option: {
        min: 5,
        max: 20,
      },
      errorMessage: "Password should be between 6-20",
    },
  },
};

const adminLogin = {
  username: {
    notEmpty: {
      errorMessage: "username cannot be empty"
    },
    isLength: {
      option: {
        min: 2,
        max: 20
      },
    }
  },
  password: {
    notEmpty: {
      errorMessage: 'password cannot be empty'
    },
    isLength: {
      option: {
        min: 5,
        max: 20,
      }
    }
  }
}

module.exports = {
  paramValidation,
  queryValidation,
  addPersonalInfoValidation,
  addWorkInfoValidation,
  adminRegistrationSchema,
  adminLogin,
};
