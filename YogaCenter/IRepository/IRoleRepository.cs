using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IRoleRepository
    {
        public Task<ICollection<Role>> GetRoles();
        Task<Role> GetRoleByName(string name);
        Task<bool> RoleExists(Role role);
        Task<bool> CreateRole(Role roleCreate);
        bool Save();


    }
}
