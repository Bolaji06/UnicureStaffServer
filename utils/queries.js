
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

const selectAllStaff = `${JOIN}`

const selectByCardNumber = `${JOIN} WHERE w.card_number = $1;`

const queryByFirstName = `${JOIN} WHERE p.first_name ILIKE $1;`

module.exports ={
    selectByCardNumber,
    selectAllStaff,
    queryByFirstName,
}