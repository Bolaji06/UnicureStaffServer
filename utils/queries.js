const JOIN = `
SELECT 
p.id AS personal_id,
p.first_name,
p.last_name,
p.home_address,
p.phone_number,
p.email,
p.gender,
p.profile_image,
p.next_of_kin,
p.emergency_contact,
w.department,
w.job_title,
w.date_hired,
w.account_number,
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
personal_info (first_name, last_name, home_address, phone_number, gender, profile_image, next_of_kin, emergency_contact, email)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

const addWorkInfoQuery = `INSERT INTO 
work_info (personal_info_id, department, job_title, date_hired, account_number, card_number, position_status, approved, salary)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

const countRows = `SELECT COUNT(*) FROM personal_info`;

const updateCardNumber = `UPDATE work_info SET card_number = $1 WHERE personal_info_id = $2 RETURNING *`;
//UPDATE work_info SET card_number = 'TCF-11' WHERE personal_info_id = 4
const updatePersonalInfoQuery = `
            UPDATE personal_info AS p
            SET 
                first_name = $1,
                last_name = $2,
                home_address = $3,
                phone_number = $4,
                gender = $5,
                profile_image = $6,
                next_of_kin = $7,
                emergency_contact = $8
            FROM 
                work_info AS w
            WHERE 
                p.id = w.personal_info_id
                AND w.card_number = $9
        `;

module.exports = {
  selectByCardNumber,
  selectAllStaff,
  queryByFirstName,
  addPersonalInfoQuery,
  addWorkInfoQuery,
  countRows,
  updateCardNumber,
  updatePersonalInfoQuery,
};
