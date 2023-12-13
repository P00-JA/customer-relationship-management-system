const RoleRepository = require('../repository/RoleRepository');

const RoleService = {
    async insert_role(roleName){
        try{
            const role = await RoleRepository.findOneRoleByRoleName(roleName);
            if (role) {
                return { error: { message: "role already exists" } };
            }
            const createdRole = await RoleRepository.createRole({ roleName });
            return { role: createdRole };
        }catch(error){
            console.error("Error inserting role:", error);
            return { error: "Server error" };
        }
    },

    async get_all_roles(){
        const roles = await RoleRepository.findAllRoles();
        if(roles && roles.length>0){
            return roles;
        }else{
            return {error:{message: "no roles inserted yet!"}};
        }
    },

    async get_role_by_id(id){
        const role = await RoleRepository.findRoleById(id);
        if(role){
            return {
                id: role.id,
                roleName: role.roleName,
            };
        }else{
            return {error:{message:"role not found!"}};
        }
    },
};

module.exports = RoleService;