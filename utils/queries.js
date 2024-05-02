const JOIN = `
SELECT 
p.id AS personal_id,
p.first_name,
p.last_name,
p.home_address,
p.phone_number,
p.gender,
p.profile_image,
p.next_of_kin,
p.emergency_contact,
w.department,
w.job_title,
w.date_hired,
w.account_number,
w.email,
w.card_number,
w.position_status,
w.approved,
w.salary
    FROM 
        personal_info p
    JOIN 
        work_info w ON p.id = w.personal_info_id
`;

const selectAllStaff = `${JOIN}`;

const selectByCardNumber = `${JOIN} WHERE w.card_number ILIKE $1;`;

const queryByFirstName = `${JOIN} WHERE w.card_number ILIKE $1;`;

const addPersonalInfoQuery = `INSERT INTO 
personal_info (first_name, last_name, home_address, phone_number, gender, profile_image, next_of_kin, emergency_contact)
VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;

const addWorkInfoQuery = `INSERT INTO 
work_info (personal_info_id, department, job_title, date_hired, account_number, email, card_number, position_status, approved, salary)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

const countRows =`SELECT COUNT(*) FROM personal_info`;



module.exports = {
  selectByCardNumber,
  selectAllStaff,
  queryByFirstName,
  addPersonalInfoQuery,
  addWorkInfoQuery,
  countRows,
};

