﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using YogaCenter.Models;

#nullable disable

namespace YogaCenter.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("YogaCenter.Models.Certificate", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CertificateDetail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("TeacherId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TeacherId");

                    b.ToTable("Certificates");
                });

            modelBuilder.Entity("YogaCenter.Models.Class", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("ClassEndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ClassName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ClassStartDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("CourseId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("TeacherId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("TeacherId");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("YogaCenter.Models.ClassCustomer", b =>
                {
                    b.Property<Guid>("ClassId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ClassId", "CustomerId");

                    b.HasIndex("CustomerId");

                    b.ToTable("ClassCustomers");
                });

            modelBuilder.Entity("YogaCenter.Models.Course", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CourseCreateDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CourseDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CourseDetail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CourseLectureNumber")
                        .HasColumnType("int");

                    b.Property<int>("CourseLength")
                        .HasColumnType("int");

                    b.Property<int>("CoursePrice")
                        .HasColumnType("int");

                    b.Property<Guid?>("EventId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Pre_Requisite")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("YogaCenter.Models.Customer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CustomerAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerGender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CustomerPhone")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("YogaCenter.Models.CustomerLesson", b =>
                {
                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("LessonId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Attendance")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(2);

                    b.HasKey("CustomerId", "LessonId");

                    b.HasIndex("LessonId");

                    b.ToTable("CustomerLessons");
                });

            modelBuilder.Entity("YogaCenter.Models.Event", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("EventDetail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("EventDiscount")
                        .HasColumnType("real");

                    b.Property<DateTime>("EventEndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("EventName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EventStartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("YogaCenter.Models.Invoice", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CourseId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DatePay")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateRequest")
                        .HasColumnType("datetime2");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotalPay")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("CustomerId");

                    b.ToTable("Invoice");
                });

            modelBuilder.Entity("YogaCenter.Models.Lesson", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ClassId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("LessonDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("RoomId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ShiftId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.HasIndex("RoomId");

                    b.HasIndex("ShiftId");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("YogaCenter.Models.Notification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Detail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("YogaCenter.Models.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("YogaCenter.Models.Room", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("RoomDetail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("YogaCenter.Models.Shift", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("TimeEnd")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TimeStart")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Shifts");
                });

            modelBuilder.Entity("YogaCenter.Models.Teacher", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("TeacherAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TeacherEndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("TeacherGender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TeacherName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TeacherPhone")
                        .HasColumnType("int");

                    b.Property<DateTime>("TeacherStartDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Teachers");
                });

            modelBuilder.Entity("YogaCenter.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserPasswork")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("YogaCenter.Models.UserNotification", b =>
                {
                    b.Property<Guid>("NotificationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("SenderId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Daycreate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("ReceiverId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("NotificationId", "SenderId");

                    b.HasIndex("ReceiverId");

                    b.HasIndex("SenderId");

                    b.ToTable("UserNotifications");
                });

            modelBuilder.Entity("YogaCenter.Models.Certificate", b =>
                {
                    b.HasOne("YogaCenter.Models.Teacher", "Teacher")
                        .WithMany("Certificates")
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("YogaCenter.Models.Class", b =>
                {
                    b.HasOne("YogaCenter.Models.Course", "Course")
                        .WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YogaCenter.Models.Teacher", "Teacher")
                        .WithMany()
                        .HasForeignKey("TeacherId");

                    b.Navigation("Course");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("YogaCenter.Models.ClassCustomer", b =>
                {
                    b.HasOne("YogaCenter.Models.Class", "Class")
                        .WithMany("ClassCustomers")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YogaCenter.Models.Customer", "Customer")
                        .WithMany("ClassCustomers")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("YogaCenter.Models.Course", b =>
                {
                    b.HasOne("YogaCenter.Models.Event", "Event")
                        .WithMany("Courses")
                        .HasForeignKey("EventId");

                    b.Navigation("Event");
                });

            modelBuilder.Entity("YogaCenter.Models.Customer", b =>
                {
                    b.HasOne("YogaCenter.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("YogaCenter.Models.CustomerLesson", b =>
                {
                    b.HasOne("YogaCenter.Models.Customer", "Customer")
                        .WithMany("CustomerLessons")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YogaCenter.Models.Lesson", "Lesson")
                        .WithMany("CustomerLessons")
                        .HasForeignKey("LessonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Lesson");
                });

            modelBuilder.Entity("YogaCenter.Models.Invoice", b =>
                {
                    b.HasOne("YogaCenter.Models.Course", "Course")
                        .WithMany("Invoices")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YogaCenter.Models.Customer", "Customer")
                        .WithMany("Invoices")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("YogaCenter.Models.Lesson", b =>
                {
                    b.HasOne("YogaCenter.Models.Class", "Class")
                        .WithMany("Lessons")
                        .HasForeignKey("ClassId");

                    b.HasOne("YogaCenter.Models.Room", "Room")
                        .WithMany("ClassLessons")
                        .HasForeignKey("RoomId");

                    b.HasOne("YogaCenter.Models.Shift", "Shift")
                        .WithMany("ClassLessons")
                        .HasForeignKey("ShiftId");

                    b.Navigation("Class");

                    b.Navigation("Room");

                    b.Navigation("Shift");
                });

            modelBuilder.Entity("YogaCenter.Models.Teacher", b =>
                {
                    b.HasOne("YogaCenter.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("YogaCenter.Models.User", b =>
                {
                    b.HasOne("YogaCenter.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("YogaCenter.Models.UserNotification", b =>
                {
                    b.HasOne("YogaCenter.Models.Notification", "Notification")
                        .WithMany("UserNotifications")
                        .HasForeignKey("NotificationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YogaCenter.Models.User", "Receiver")
                        .WithMany("UserNotificationsReceiver")
                        .HasForeignKey("ReceiverId");

                    b.HasOne("YogaCenter.Models.User", "Sender")
                        .WithMany("UserNotificationsSender")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Notification");

                    b.Navigation("Receiver");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("YogaCenter.Models.Class", b =>
                {
                    b.Navigation("ClassCustomers");

                    b.Navigation("Lessons");
                });

            modelBuilder.Entity("YogaCenter.Models.Course", b =>
                {
                    b.Navigation("Invoices");
                });

            modelBuilder.Entity("YogaCenter.Models.Customer", b =>
                {
                    b.Navigation("ClassCustomers");

                    b.Navigation("CustomerLessons");

                    b.Navigation("Invoices");
                });

            modelBuilder.Entity("YogaCenter.Models.Event", b =>
                {
                    b.Navigation("Courses");
                });

            modelBuilder.Entity("YogaCenter.Models.Lesson", b =>
                {
                    b.Navigation("CustomerLessons");
                });

            modelBuilder.Entity("YogaCenter.Models.Notification", b =>
                {
                    b.Navigation("UserNotifications");
                });

            modelBuilder.Entity("YogaCenter.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("YogaCenter.Models.Room", b =>
                {
                    b.Navigation("ClassLessons");
                });

            modelBuilder.Entity("YogaCenter.Models.Shift", b =>
                {
                    b.Navigation("ClassLessons");
                });

            modelBuilder.Entity("YogaCenter.Models.Teacher", b =>
                {
                    b.Navigation("Certificates");
                });

            modelBuilder.Entity("YogaCenter.Models.User", b =>
                {
                    b.Navigation("UserNotificationsReceiver");

                    b.Navigation("UserNotificationsSender");
                });
#pragma warning restore 612, 618
        }
    }
}
