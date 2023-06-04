using YogaCenter.Models;
using YogaCenter.ModelsDto;

namespace YogaCenter.IRepository
{
    public interface IUserRepository
    {
        public Task<ICollection<User>> GetAllUsers();
        Task<User> Login(string userName,string userPassWork);
        Task<User> GetUserById(Guid id);
        Task<User> GetUserByName(string userName);
        Task<bool> CreateUser(User userCreate);
        Task<bool> UpdateUser(User userUpdate);
        Task<bool> UserExists(string userName);
        Task<bool> UserExistsById(Guid userName);
        Task<bool> DeleteUser(User userDelete);
        Task<bool> Save();
    }
}
