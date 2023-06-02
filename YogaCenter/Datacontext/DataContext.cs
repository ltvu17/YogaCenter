using Microsoft.EntityFrameworkCore;
using YogaCenter_SWP_.Models;

namespace YogaCenter_SWP_.Datacontext
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Certificate> Certificates { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<ClassCustomer> ClassCustomers { get; set; }
        public DbSet<CustomerLesson> CustomerLessons { get; set; }
        public DbSet<Invoice> Invoice { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasMany(e => e.Classes)
                .WithMany(e => e.Customers)
                .UsingEntity<ClassCustomer>();

            modelBuilder.Entity<Customer>()
                .HasMany(e => e.Lessons)
                .WithMany(e => e.Customers)
                .UsingEntity<CustomerLesson>(
                r => r.Property(r => r.Attendance).HasDefaultValue(2)
                );
        }
    }
}
