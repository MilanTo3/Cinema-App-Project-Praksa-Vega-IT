﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PersistenceLayer;

#nullable disable

namespace PersistenceLayer.Migrations
{
    [DbContext(typeof(RepositoryDbContext))]
    [Migration("20221103084539_RatingMigration")]
    partial class RatingMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("DomainLayer.Models.Genre", b =>
                {
                    b.Property<long>("genreId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("genreId"), 1L, 1);

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("updated")
                        .HasColumnType("datetime2");

                    b.HasKey("genreId");

                    b.ToTable("Genre", (string)null);
                });

            modelBuilder.Entity("DomainLayer.Models.Movie", b =>
                {
                    b.Property<long>("movieId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("movieId"), 1L, 1);

                    b.Property<float>("averageRating")
                        .HasColumnType("real");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<int>("duration")
                        .HasColumnType("int");

                    b.Property<string>("nameLocal")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nameOriginal")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("trailer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("movieId");

                    b.ToTable("Movie", (string)null);
                });

            modelBuilder.Entity("DomainLayer.Models.Reservation", b =>
                {
                    b.Property<long>("reservationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("reservationId"), 1L, 1);

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("rating")
                        .HasColumnType("int");

                    b.Property<long>("screeningId")
                        .HasColumnType("bigint");

                    b.Property<long>("totalPrice")
                        .HasColumnType("bigint");

                    b.HasKey("reservationId");

                    b.HasIndex("screeningId");

                    b.ToTable("Reservation", (string)null);
                });

            modelBuilder.Entity("DomainLayer.Models.ReservedSeat", b =>
                {
                    b.Property<long>("seatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("seatId"), 1L, 1);

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("reservationId")
                        .HasColumnType("bigint");

                    b.Property<string>("rowColumnId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("screeningId")
                        .HasColumnType("bigint");

                    b.HasKey("seatId");

                    b.HasIndex("reservationId");

                    b.ToTable("ReservedSeat", (string)null);
                });

            modelBuilder.Entity("DomainLayer.Models.Screening", b =>
                {
                    b.Property<long>("screeningId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("screeningId"), 1L, 1);

                    b.Property<int>("column")
                        .HasColumnType("int");

                    b.Property<bool>("deleted")
                        .HasColumnType("bit");

                    b.Property<DateTime>("fromScreening")
                        .HasColumnType("datetime2");

                    b.Property<long>("movieId")
                        .HasColumnType("bigint");

                    b.Property<float>("price")
                        .HasColumnType("real");

                    b.Property<int>("row")
                        .HasColumnType("int");

                    b.Property<DateTime>("updateDateTime")
                        .HasColumnType("datetime2");

                    b.HasKey("screeningId");

                    b.HasIndex("movieId");

                    b.ToTable("Screening", (string)null);
                });

            modelBuilder.Entity("DomainLayer.Models.User", b =>
                {
                    b.Property<long>("userId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("userId"), 1L, 1);

                    b.Property<string>("PasswordResetToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VerificationToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("birthday")
                        .HasColumnType("datetime2");

                    b.Property<bool>("blocked")
                        .HasColumnType("bit");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("updateDateTime")
                        .HasColumnType("datetime2");

                    b.Property<bool>("verified")
                        .HasColumnType("bit");

                    b.HasKey("userId");

                    b.HasAlternateKey("email");

                    b.ToTable("User", (string)null);
                });

            modelBuilder.Entity("GenreMovie", b =>
                {
                    b.Property<long>("GenresgenreId")
                        .HasColumnType("bigint");

                    b.Property<long>("MoviesmovieId")
                        .HasColumnType("bigint");

                    b.HasKey("GenresgenreId", "MoviesmovieId");

                    b.HasIndex("MoviesmovieId");

                    b.ToTable("GenreMovie");
                });

            modelBuilder.Entity("DomainLayer.Models.Reservation", b =>
                {
                    b.HasOne("DomainLayer.Models.Screening", "screening")
                        .WithMany("Reservations")
                        .HasForeignKey("screeningId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("screening");
                });

            modelBuilder.Entity("DomainLayer.Models.ReservedSeat", b =>
                {
                    b.HasOne("DomainLayer.Models.Reservation", "reservation")
                        .WithMany("reservedSeats")
                        .HasForeignKey("reservationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("reservation");
                });

            modelBuilder.Entity("DomainLayer.Models.Screening", b =>
                {
                    b.HasOne("DomainLayer.Models.Movie", "Movie")
                        .WithMany("Screenings")
                        .HasForeignKey("movieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("GenreMovie", b =>
                {
                    b.HasOne("DomainLayer.Models.Genre", null)
                        .WithMany()
                        .HasForeignKey("GenresgenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DomainLayer.Models.Movie", null)
                        .WithMany()
                        .HasForeignKey("MoviesmovieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DomainLayer.Models.Movie", b =>
                {
                    b.Navigation("Screenings");
                });

            modelBuilder.Entity("DomainLayer.Models.Reservation", b =>
                {
                    b.Navigation("reservedSeats");
                });

            modelBuilder.Entity("DomainLayer.Models.Screening", b =>
                {
                    b.Navigation("Reservations");
                });
#pragma warning restore 612, 618
        }
    }
}
