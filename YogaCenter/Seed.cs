using Microsoft.EntityFrameworkCore;
using YogaCenter_SWP_.Datacontext;
using YogaCenter_SWP_.Models;

namespace YogaCenter_SWP_
{
    public class Seed
    {
        private readonly DataContext _context;

        public Seed(DataContext context)
        {
            _context = context;
        }
        public void SeedData()
        {
            Guid roleIdAdmin = Guid.NewGuid();
            Guid roleIdStaff = Guid.NewGuid();
            Guid roleIdCustomer = Guid.NewGuid();
            Guid roleIdTeacher = Guid.NewGuid();
            Guid customer1Id = Guid.NewGuid();
            Guid customer2Id = Guid.NewGuid();
            Guid customer3Id = Guid.NewGuid();
            Guid customer4Id = Guid.NewGuid();
            Guid customer5Id = Guid.NewGuid();
            Guid customer6Id = Guid.NewGuid();
            Guid customer7Id = Guid.NewGuid();
            Guid customer8Id = Guid.NewGuid();
            Guid customer9Id = Guid.NewGuid();
            Guid customer10Id = Guid.NewGuid();
            Guid customer11Id = Guid.NewGuid();
            Guid customer12Id = Guid.NewGuid();
            Guid customer13Id = Guid.NewGuid();
            Guid customer14Id = Guid.NewGuid();
            Guid customer15Id = Guid.NewGuid();
            Guid customer16Id = Guid.NewGuid();
            Guid customer17Id = Guid.NewGuid();
            Guid customer18Id = Guid.NewGuid();
            Guid customer19Id = Guid.NewGuid();
            Guid customer20Id = Guid.NewGuid();
            Guid UserCus1 = Guid.NewGuid();
            Guid UserCus2 = Guid.NewGuid();
            Guid UserCus3 = Guid.NewGuid();
            Guid UserCus4 = Guid.NewGuid();
            Guid UserCus5 = Guid.NewGuid();
            Guid UserCus6 = Guid.NewGuid();
            Guid UserCus7 = Guid.NewGuid();
            Guid UserCus8 = Guid.NewGuid();
            Guid UserCus9 = Guid.NewGuid();
            Guid UserCus10 = Guid.NewGuid();
            Guid UserCus11 = Guid.NewGuid();
            Guid UserCus12 = Guid.NewGuid();
            Guid UserCus13 = Guid.NewGuid();
            Guid UserCus14 = Guid.NewGuid();
            Guid UserCus15 = Guid.NewGuid();
            Guid UserCus16 = Guid.NewGuid();
            Guid UserCus17 = Guid.NewGuid();
            Guid UserCus18 = Guid.NewGuid();
            Guid UserCus19 = Guid.NewGuid();
            Guid UserCus20 = Guid.NewGuid();

            
            if( _context.ClassCustomers.Any())
            {
                if (!_context.Roles.Any())
                {
                    var roles = new List<Role>()
                {
                    new Role()
                    {
                        Id = roleIdAdmin,
                        RoleName ="Admin"
                    },
                    new Role()
                    {
                        Id = roleIdStaff,
                        RoleName ="Staff"
                    },
                    new Role()
                    {
                        Id = roleIdCustomer,
                        RoleName ="Customer"
                    },
                    new Role()
                    {
                        Id = roleIdTeacher,
                        RoleName ="Teacher"
                    }
                };
                    _context.AddRange(roles);

                    var ClassCustomers = new List<ClassCustomer>()
                {
                    new ClassCustomer()
                    {
                        Customer = new Customer()
                        {
                            Id = customer1Id,
                            CustomerName = "Thien",
                            CustomerAddress = "Vinhome",
                            CustomerGender =  "Male",
                            CustomerPhone = 092595393,
                            User = new User()
                            {
                               Id= UserCus1,
                               Role = roles.Where(r => r.RoleName == "Customer").First()
                            }
                        }
                    }
                };
                    _context.AddRange(ClassCustomers);
                }

            }

        }
    }
}
