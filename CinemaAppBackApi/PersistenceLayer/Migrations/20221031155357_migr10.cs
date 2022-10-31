using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersistenceLayer.Migrations
{
    public partial class migr10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "totalPrice",
                table: "Reservation",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_screeningId",
                table: "Reservation",
                column: "screeningId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Screening_screeningId",
                table: "Reservation",
                column: "screeningId",
                principalTable: "Screening",
                principalColumn: "screeningId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Screening_screeningId",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_Reservation_screeningId",
                table: "Reservation");

            migrationBuilder.AlterColumn<string>(
                name: "totalPrice",
                table: "Reservation",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}
