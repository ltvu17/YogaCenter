using Microsoft.EntityFrameworkCore;
using YogaCenter.Models;

namespace YogaCenter
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
            Guid teacherId = Guid.NewGuid();
            Guid userTeacherId = Guid.NewGuid();
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
            Guid Class1 = Guid.NewGuid();
            Guid Course1 = Guid.NewGuid();
            Random rnd = new Random();

            if (!_context.ClassCustomers.Any())
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
                    },
                    new Role()
                    {
                        Id = Guid.NewGuid(),
                        RoleName = "Manager"
                    }
                };
                    _context.AddRange(roles);
                    var course = new Course()
                    {
                        Id = Course1,
                        CourseCreateDate = DateTime.Now,
                        CourseDescription = "nothing",
                        CourseDetail = "notyet",
                        CourseLectureNumber = 30,
                        CourseLength = 30,
                        Pre_Requisite = "no",
                        CoursePrice = 30,
                    };
                    _context.Add(course);           
                    var customer = new List<Customer>()
                    {
                        new Customer()
                        {
                            Id=customer1Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Vinhome",
                            CustomerName = "Thien",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus1,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Thien@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer2Id,
                            CustomerGender = "Female",
                            CustomerAddress = "Quan10",
                            CustomerName = "Tin",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus2,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Tin@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer3Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Quan10",
                            CustomerName = "Nhat",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus3,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Nhat@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer4Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Quan11",
                            CustomerName = "Cuong",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus4,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Cuong@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer5Id,
                            CustomerGender = "Female",
                            CustomerAddress = "Quan Binh Thanh",
                            CustomerName = "TTin",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus5,
                                Role = roles[2],
                                Status = 1,
                                UserName = "TTin@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer6Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Quan11",
                            CustomerName = "Hai",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus6,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Hai@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer7Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Pho Co",
                            CustomerName = "Dat",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus7,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Dat@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer8Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Quan12",
                            CustomerName = "Tuan",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus8,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Tuan@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer10Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Da Nang city",
                            CustomerName = "Duong",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus10,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Duong@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer11Id,
                            CustomerGender = "Female",
                            CustomerAddress = "Vinhome",
                            CustomerName = "Nga",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus11,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Nga@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer12Id,
                            CustomerGender = "Female",
                            CustomerAddress = "Vinhome",
                            CustomerName = "Linh",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus12,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Linh@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer13Id,
                            CustomerGender = "Female",
                            CustomerAddress = "Vinhome",
                            CustomerName = "Nhi",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus13,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Nhi@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer14Id,
                            CustomerGender = "Female",
                            CustomerAddress = "Quan Binh Thanh",
                            CustomerName = "Tung Chi",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus14,
                                Role = roles[2],
                                Status = 1,
                                UserName = "TungChi@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer15Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Quan11",
                            CustomerName = "Giang",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus15,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Giang@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer16Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Vinhome",
                            CustomerName = "Chi",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus16,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Chi@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer17Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Vinhome",
                            CustomerName = "Hoang",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus17,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Hoang@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer18Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Vinhome",
                            CustomerName = "haha",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus18,
                                Role = roles[2],
                                Status = 1,
                                UserName = "haha@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer19Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Vinhome",
                            CustomerName = "Long",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus19,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Long@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer20Id,
                            CustomerGender = "Male",
                            CustomerAddress = "Vinhome",
                            CustomerName = "ShenLong",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus20,
                                Role = roles[2],
                                Status = 1,
                                UserName = "ShenLong@gmail.com",
                                UserPasswork = "123"
                            }
                        },
                        new Customer()
                        {
                            Id=customer9Id,
                            CustomerGender = "Female",
                            CustomerAddress = "Vinhome",
                            CustomerName = "Shina",
                            CustomerPhone = rnd.Next(100000000,999999999),
                            User = new User()
                            {
                                Id = UserCus9,
                                Role = roles[2],
                                Status = 1,
                                UserName = "Shina@gmail.com",
                                UserPasswork = "123"
                            }
                        }
                    };
                    _context.AddRange(customer);                   
                    var teacher = new Teacher() 
                    {
                        Id = teacherId,
                        TeacherName = "Bui Huu Dong",
                        TeacherGender = "Male",
                        TeacherAddress = "Quan12",
                        TeacherPhone = rnd.Next(100000000, 999999999),
                        TeacherStartDate = DateTime.Now,
                        TeacherEndDate = DateTime.MaxValue,
                        User = new User()
                        {
                            Id = userTeacherId,
                            Role = roles[3],
                            Status = 1,
                            UserName = "DongBH@gmail.com",
                            UserPasswork = "1234"
                        }
                    };
                    _context.Add(teacher);                  
                    var certificate = new Certificate()
                    {
                        Id = Guid.NewGuid(),
                        ImagePath= "Images/Teacher/Certificate",
                        CertificateDetail = "doctor",
                        Teacher = teacher,
                    };
                    _context.Add(certificate);
                    var classes = new Class()
                    {
                        Id = Guid.NewGuid(),
                        Teacher = teacher,
                        Course = course,
                        ClassStartDate = DateTime.Now,
                        ClassEndDate = DateTime.Now.AddMonths(3),
                    };
                    _context.Add(classes);
                    var classCustomers = new List<ClassCustomer>()
                    {
                        new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[0],
                        },
                        new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[1],
                        },
                        new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[2],
                        },
                        new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[3],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[4],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[5],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[6],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[7],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[8],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[9],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[10],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[11],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[12],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[13],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[14],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[15],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[16],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[17],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[18],
                        },new ClassCustomer()
                        {
                            Class = classes,
                            Customer = customer[19],
                        },

                    };
                    _context.AddRange(classCustomers);
                    var room = new Room()
                    {
                        Id = Guid.NewGuid(),
                        RoomDetail = "Phong tap yoga day du"
                    };
                    _context.Add(room);
                    var shift = new List<Shift>()
                    {
                        new Shift()
                        {
                            Id = Guid.NewGuid(),
                            TimeStart = DateTime.Parse("9999/12/31 06:00:00"),
                            TimeEnd = DateTime.Parse("9999/12/31 07:00:00")
                        },
                        new Shift()
                        {
                            Id = Guid.NewGuid(),
                            TimeStart = DateTime.Parse("9999/12/31 07:00:00"),
                            TimeEnd = DateTime.Parse("9999/12/31 08:00:00")
                        },
                        new Shift()
                        {
                            Id = Guid.NewGuid(),
                            TimeStart = DateTime.Parse("9999/12/31 17:00:00"),
                            TimeEnd = DateTime.Parse("9999/12/31 18:00:00")
                        },
                        new Shift()
                        {
                            Id = Guid.NewGuid(),
                            TimeStart = DateTime.Parse("9999/12/31 18:00:00"),
                            TimeEnd = DateTime.Parse("9999/12/31 19:00:00")
                        }
                    };
                    _context.AddRange(shift);
                    var lesson = new List<Lesson>()
                    {
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/07"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/09"), 
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/11"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/14"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/16"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/18"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/21"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/23"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/25"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/28"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/08/30"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/01"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/04"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/06"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/08"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/11"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/13"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/15"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/18"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/20"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/22"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/25"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/27"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/09/29"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/10/02"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/10/04"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/10/06"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/10/9"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/10/11"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },
                        new Lesson()
                        {
                            Id = Guid.NewGuid(),
                            Class = classes,
                            LessonDate = DateTime.Parse("2023/10/13"),
                            Room = room,
                            Shift =  shift[0],
                            Status = 0
                        },

                    };
                    _context.AddRange(lesson);
                    var customerLessons = new List<CustomerLesson>();
                    foreach(Lesson les in lesson)
                    {
                        foreach(Customer cus in customer)
                        {
                            var customerLesson = new CustomerLesson()
                            {
                                Customer = cus,
                                Lesson = les,
                                Attendance = 2
                            };
                            customerLessons.Add(customerLesson);
                        }
                    }
                    _context.AddRange(customerLessons);
                    var invoice = new List<Invoice>();
                    foreach(var cus in customer)
                    {
                        invoice.Add(new Invoice()
                        {
                            Customer = cus,
                            Course = course,
                            DatePay = DateTime.Now,
                            DateRequest = DateTime.Now,
                            Id = Guid.NewGuid(),
                            Note = "Paid",
                            TotalPay= 3000000
                        });
                    }             
                   
                    _context.AddRange(invoice);
                    var staff = new User()
                    {
                        Id = Guid.NewGuid(),
                        UserName = "staff@gmail.com",
                        UserPasswork = "12345",
                        Status = 1,
                        Role = roles[1]
                    };
                    _context.Add(staff);
                    var manager = new User()
                    {
                        Id = Guid.NewGuid(),
                        UserName = "manager@gmail.com",
                        UserPasswork = "12345",
                        Status = 1,
                        Role = roles[4]
                    };
                    _context.Add(manager);
                    var admin = new User()
                    {
                        Id = Guid.NewGuid(),
                        UserName = "admin@gmail.com",
                        UserPasswork = "12345",
                        Status = 1,
                        Role = roles[0]
                    };
                    _context.Add(admin);
                    _context.SaveChanges();
                }

            }

        }
    }
}
